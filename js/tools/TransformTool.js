/**
 * Transform Tool - Text transformation tool
 */
class TransformTool extends Tool {
    constructor() {
        super({
            id: 'transforms',
            name: 'Transform',
            icon: 'fa-font',
            title: 'Transform text (T)',
            order: 1
        });
    }
    
    getVueData() {
        const transforms = (window.transforms && Object.keys(window.transforms).length > 0)
            ? Object.entries(window.transforms).map(([key, transform]) => ({
                name: transform.name,
                func: transform.func.bind(transform),
                preview: transform.preview.bind(transform),
                reverse: transform.reverse ? transform.reverse.bind(transform) : null,
                category: transform.category || 'special'
            }))
            : [];
        
        const categorySet = new Set();
        transforms.forEach(transform => {
            if (transform.category) {
                categorySet.add(transform.category);
            }
        });
        
        // Sort categories, but always put randomizer last
        const sortedCategories = Array.from(categorySet).sort((a, b) => {
            if (a === 'randomizer') return 1;
            if (b === 'randomizer') return -1;
            return a.localeCompare(b);
        });
        
        return {
            transformInput: '',
            transformOutput: '',
            activeTransform: null,
            transforms: transforms,
            categories: sortedCategories
        };
    }
    
    getVueMethods() {
        return {
            getDisplayCategory: function(transformName) {
                // Find transform by name and return its category property
                const transform = this.transforms.find(t => t.name === transformName);
                return transform ? transform.category : 'special';
            },
            getTransformsByCategory: function(category) {
                return this.transforms.filter(transform => transform.category === category);
            },
            isSpecialCategory: function(category) {
                return category === 'randomizer';
            },
            applyTransform: function(transform, event) {
                event && event.preventDefault();
                event && event.stopPropagation();
                
                if (transform && transform.name === 'Random Mix') {
                    this.triggerRandomizerChaos();
                }
                
                if (this.transformInput) {
                    this.activeTransform = transform;
                    
                    if (transform.name === 'Random Mix') {
                        this.transformOutput = window.transforms.randomizer.func(this.transformInput);
                        const transformInfo = window.transforms.randomizer.getLastTransformInfo();
                        if (transformInfo.length > 0) {
                            const transformsList = transformInfo.map(t => t.transformName).join(', ');
                            this.showNotification(`Mixed with: ${transformsList}`, 'success', 'fas fa-random');
                        }
                    } else {
                        this.transformOutput = transform.func(this.transformInput);
                    }
                    
                    this.isTransformCopy = true;
                    this.forceCopyToClipboard(this.transformOutput);
                    this.addToCopyHistory(`Transform: ${transform.name}`, this.transformOutput);
                    
                    if (transform.name !== 'Random Mix') {
                        this.showNotification(`${transform.name} applied and copied!`, 'success', 'fas fa-check');
                    }
                    
                    document.querySelectorAll('.transform-button').forEach(button => {
                        button.classList.remove('active');
                    });
                    
                    const inputBox = document.querySelector('#transform-input');
                    if (inputBox) {
                        this.focusWithoutScroll(inputBox);
                        const len = inputBox.value.length;
                        try { inputBox.setSelectionRange(len, len); } catch (_) {}
                    }
                    
                    this.isTransformCopy = false;
                    this.ignoreKeyboardEvents = false;
                }
            },
            autoTransform: function() {
                if (this.transformInput && this.activeTransform && this.activeTab === 'transforms') {
                    const segments = window.EmojiUtils.splitEmojis(this.transformInput);
                    const transformedSegments = segments.map(segment => {
                        if (segment.length > 1 || /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}]/u.test(segment)) {
                            return segment;
                        }
                        return this.activeTransform.func(segment);
                    });
                    this.transformOutput = window.EmojiUtils.joinEmojis(transformedSegments);
                }
            },
            initializeCategoryNavigation: function() {
                this.$nextTick(() => {
                    const legendItems = document.querySelectorAll('.transform-category-legend .legend-item');
                    legendItems.forEach(item => {
                        const newItem = item.cloneNode(true);
                        item.parentNode.replaceChild(newItem, item);
                    });
                    
                    document.querySelectorAll('.transform-category-legend .legend-item').forEach(item => {
                        item.addEventListener('click', () => {
                            const targetId = item.getAttribute('data-target');
                            if (targetId) {
                                const targetElement = document.getElementById(targetId);
                                if (targetElement) {
                                    document.querySelectorAll('.transform-category-legend .legend-item').forEach(li => {
                                        li.classList.remove('active-category');
                                    });
                                    item.classList.add('active-category');
                                    
                                    const inputSection = document.querySelector('.input-section');
                                    const inputSectionHeight = inputSection.offsetHeight;
                                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                                    const offsetPosition = elementPosition - inputSectionHeight - 10;
                                    
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                    
                                    targetElement.classList.add('highlight-section');
                                    setTimeout(() => {
                                        targetElement.classList.remove('highlight-section');
                                    }, 1000);
                                }
                            }
                        });
                    });
                });
            }
        };
    }
    
    getVueWatchers() {
        return {
            transformInput() {
                if (this.activeTransform && this.activeTab === 'transforms') {
                    this.transformOutput = this.activeTransform.func(this.transformInput);
                }
            }
        };
    }
    
    getVueLifecycle() {
        return {
            mounted() {
                this.initializeCategoryNavigation();
            }
        };
    }
    
    onActivate(vueInstance) {
        vueInstance.$nextTick(() => {
            vueInstance.initializeCategoryNavigation();
        });
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TransformTool;
} else {
    window.TransformTool = TransformTool;
}



