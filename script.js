// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 滚动动画效果
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeInOnScroll = function() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // 初始检查
    fadeInOnScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', fadeInOnScroll);
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 关闭移动端菜单（如果打开）
                mobileMenu.classList.remove('active');
            }
        });
    });
    
    // 移动端菜单切换
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            // 切换图标
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // 点击菜单外区域关闭菜单
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mobileMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // 邮箱复制功能
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            
            // 使用 Clipboard API 复制文本
            navigator.clipboard.writeText(textToCopy).then(() => {
                // 显示复制成功反馈
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#4CAF50';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('复制失败:', err);
                alert('复制失败，请手动复制邮箱地址');
            });
        });
    });
    
    // 图片加载失败处理
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // 如果图片加载失败，隐藏img元素并显示备选方案
            this.style.display = 'none';
            const altText = this.alt || '图片';
            const parent = this.parentNode;
            const fallbackDiv = document.createElement('div');
            fallbackDiv.className = this.className + ' img-fallback';
            fallbackDiv.textContent = altText;
            parent.appendChild(fallbackDiv);
        });
    });
    
    // 导航栏滚动效果
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动，隐藏导航栏
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动，显示导航栏
            header.style.transform = 'translateY(0)';
        }
        
        // 添加滚动阴影
        if (scrollTop > 10) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // 控制台欢迎信息
    console.log('%c👨‍🔬 欢迎访问药学生个人网站!', 'color: #0066cc; font-size: 18px; font-weight: bold;');
    console.log('%c🔬 研究方向: 肿瘤组织糖基化研究、基因调控、核酸药物递送', 'color: #1d1d1f;');
});