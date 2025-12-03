/**
 * Splitter Tool - Split text into multiple copyable messages
 */
class SplitterTool extends Tool {
    constructor() {
        super({
            id: 'splitter',
            name: 'Splitter',
            icon: 'fa-grip-lines',
            title: 'Split text into multiple copyable messages',
            order: 7
        });
    }
    
    getVueData() {
        return {
            // Message Splitter Tab
            splitterInput: '',
            splitterMode: 'word', // 'chunk' or 'word' - default to word
            splitterChunkSize: 6,
            splitterWordSplitSide: 'left', // 'left' or 'right' for even-length words
            splitterWordSkip: 0, // number of words to skip between splits
            splitterMinWordLength: 2, // minimum word length to consider for splitting (skip shorter words)
            splitterSplitFirstWord: true, // whether to split the first word (true) or keep it whole (false)
            splitterCopyAsSingleLine: false, // copy as single line (true) or multiline (false)
            splitterTransforms: [''], // array of transform names to apply in sequence (start with one empty slot)
            splitterStartWrap: '',
            splitterEndWrap: '',
            splitMessages: []
        };
    }
    
    getVueMethods() {
        return {
            /**
             * Set encapsulation start and end strings
             * @param {string} start - The start string
             * @param {string} end - The end string
             */
            setEncapsulation(start, end) {
                this.splitterStartWrap = start;
                this.splitterEndWrap = end;
            },

            /**
             * Handle transform change - auto-add next dropdown or collapse consecutive Nones
             * @param {number} index - The index of the transformation that changed
             */
            handleTransformChange(index) {
                const value = this.splitterTransforms[index];
                
                if (value && value !== '') {
                    // Transform was selected - add next dropdown if it doesn't exist
                    if (index === this.splitterTransforms.length - 1) {
                        this.splitterTransforms.push('');
                    }
                } else {
                    // Transform was set to None
                    // Check if previous dropdown is also None - if so, remove current one and collapse from previous position
                    if (index > 0) {
                        const prev = this.splitterTransforms[index - 1];
                        if (!prev || prev === '') {
                            // Collapse: remove this dropdown
                            this.splitterTransforms.splice(index, 1);
                        }
                    } else if (index === 0 && this.splitterTransforms.length === 1) {
                        // Only one dropdown and it's set to None - keep it as the starting dropdown
                        // Do nothing
                    } else if (index === 0 && this.splitterTransforms.length > 1) {
                        // First dropdown set to None, check if next is also None
                        const next = this.splitterTransforms[1];
                        if (!next || next === '') {
                            // Remove the first one
                            this.splitterTransforms.splice(0, 1);
                        }
                    }
                }
                
                // Ensure there's always at least one dropdown
                if (this.splitterTransforms.length === 0) {
                    this.splitterTransforms = [''];
                }
                
                // Force Vue to update
                this.$forceUpdate();
            },

            /**
             * Generate split messages from input text
             * Supports two modes: character chunks or split words in half
             */
            generateSplitMessages() {
                // Clear previous output at the start
                this.splitMessages = [];

                const input = this.splitterInput;
                if (!input) {
                    return;
                }

                let chunks = [];

                if (this.splitterMode === 'chunk') {
                    // Character chunk mode
                    const chunkSize = Math.max(1, Math.min(500, this.splitterChunkSize || 6));
                    for (let i = 0; i < input.length; i += chunkSize) {
                        chunks.push(input.slice(i, i + chunkSize));
                    }
                } else if (this.splitterMode === 'word') {
                    // Word split mode - creates messages with pattern: secondHalf + wholeWords + firstHalf
                    // IMPORTANT: ALL words must be included in output, never filtered out
                    const words = input.match(/\S+/g) || [];
                    if (words.length === 0) return;
                    
                    const skipCount = Math.max(0, Math.min(20, this.splitterWordSkip || 0));
                    const minLength = Math.max(1, this.splitterMinWordLength || 2);
                    
                    // Process all words - only split words that meet minimum length
                    // Short words are kept whole but still included in the pattern
                    let wordsToProcess = words;
                    let prependToFirst = [];
                    
                    // Handle "Split First Word" option
                    if (!this.splitterSplitFirstWord && words.length > 0) {
                        prependToFirst = [words[0]];
                        wordsToProcess = words.slice(1);
                    }

                    // Build word processing array - track which words can be split vs kept whole
                    const wordData = wordsToProcess.map((word, idx) => {
                        const canSplit = word.length >= minLength && word.length > 1;
                        return {
                            word: word,
                            canSplit: canSplit,
                            index: idx
                        };
                    });

                    // Determine which words to split (only words that can be split)
                    const splittableWords = wordData.filter(w => w.canSplit);
                    if (splittableWords.length === 0) {
                        // No words can be split, output everything as one message
                        chunks.push([...prependToFirst, ...wordsToProcess].join(' '));
                        return;
                    }

                    // Determine split pattern based on splittable words only
                    const splitIndexes = new Set();
                    for (let i = 0; i < splittableWords.length; i++) {
                        if ((i % (skipCount + 1)) === 0) {
                            splitIndexes.add(splittableWords[i].index);
                        }
                    }

                    // Process all words and build split structure
                    const processedWords = wordData.map((wd, idx) => {
                        if (splitIndexes.has(idx) && wd.canSplit) {
                            // Split this word
                            let splitPos;
                            if (wd.word.length % 2 === 0) {
                                splitPos = wd.word.length / 2;
                            } else {
                                splitPos = this.splitterWordSplitSide === 'left' 
                                    ? Math.ceil(wd.word.length / 2) 
                                    : Math.floor(wd.word.length / 2);
                            }
                            return {
                                firstHalf: wd.word.slice(0, splitPos),
                                secondHalf: wd.word.slice(splitPos),
                                split: true
                            };
                        }
                        // Keep whole (either too short or skipped)
                        return { whole: wd.word, split: false };
                    });

                    // Build output messages
                    let currentMessage = [...prependToFirst];
                    let messageStarted = false;

                    for (let i = 0; i < processedWords.length; i++) {
                        const item = processedWords[i];
                        
                        if (item.split) {
                            if (!messageStarted) {
                                // First split word - add first half to current message
                                currentMessage.push(item.firstHalf);
                                chunks.push(currentMessage.join(' '));
                                currentMessage = [item.secondHalf];
                                messageStarted = true;
                            } else {
                                // Add first half to current message, then start new message with second half
                                currentMessage.push(item.firstHalf);
                                chunks.push(currentMessage.join(' '));
                                currentMessage = [item.secondHalf];
                            }
                        } else {
                            // Whole word - add to current message (ALL words included)
                            currentMessage.push(item.whole);
                        }
                    }

                    // Add any remaining message
                    if (currentMessage.length > 0) {
                        chunks.push(currentMessage.join(' '));
                    }
                }

                // Apply transformations in sequence (chaining)
                let processedChunks = chunks;
                if (this.splitterTransforms && this.splitterTransforms.length > 0) {
                    // Filter out empty transforms
                    const activeTransforms = this.splitterTransforms.filter(t => t && t !== '');
                    
                    if (activeTransforms.length > 0) {
                        // Apply each transformation in sequence
                        for (const transformName of activeTransforms) {
                            const selectedTransform = this.transforms.find(t => t.name === transformName);
                            if (selectedTransform && selectedTransform.func) {
                                processedChunks = processedChunks.map(chunk => {
                                    try {
                                        return selectedTransform.func(chunk);
                                    } catch (e) {
                                        console.error('Transform error:', e);
                                        return chunk;
                                    }
                                });
                            }
                        }
                    }
                }

                // Apply encapsulation
                const start = this.splitterStartWrap || '';
                const end = this.splitterEndWrap || '';
                this.splitMessages = processedChunks.map(chunk => `${start}${chunk}${end}`);
            },

            /**
             * Copy all split messages to clipboard
             * Single line: merges messages into one continuous string (keeps encapsulation/transformations)
             * Multiline: copies messages separated by newlines
             */
            copyAllSplitMessages() {
                if (this.splitMessages.length === 0) return;
                
                if (this.splitterCopyAsSingleLine) {
                    // Merge all messages back together, keeping encapsulation and transformations
                    // Just join without newlines - all encapsulation/transformations are already in splitMessages
                    const merged = this.splitMessages.join('');
                    this.copyToClipboard(merged);
                } else {
                    // Copy all messages separated by newlines
                    const allMessages = this.splitMessages.join('\n');
                    this.copyToClipboard(allMessages);
                }
            }
        };
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SplitterTool;
} else {
    window.SplitterTool = SplitterTool;
}
