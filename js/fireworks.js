function showFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let fireworks = [];
    const maxFireworks = 10; // 每次动画中最多烟花数
    const spawnInterval = 500; // 每隔0.5秒生成一次烟花

    // 设置画布大小和样式
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'absolute';  // 绝对定位
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.zIndex = '9999';  // 设置z-index到最顶层
        canvas.style.pointerEvents = 'none';  // 避免canvas拦截鼠标事件
    }
    setCanvasSize();

    // 监听窗口大小变化
    window.addEventListener('resize', setCanvasSize);

    class Particle {
        constructor(x, y, color, velocityX, velocityY, size) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.velocityX = velocityX;
            this.velocityY = velocityY;
            this.radius = size || Math.random() * 3 + 1; // 粒子大小随机化
            this.opacity = 1;
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.velocityY += 0.1;
            this.opacity -= 0.01;
        }

        draw(ctx) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fill();
        }
    }

    class Firework {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.particles = [];
            const particleCount = Math.random() * 50 + 50; // 烟花粒子数量随机化

            for (let i = 0; i < particleCount; i++) {
                const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
                const velocityX = (Math.random() - 0.5) * 6;
                const velocityY = Math.random() * -15;
                const size = Math.random() * 4 + 1; // 粒子大小范围增大
                this.particles.push(new Particle(x, y, color, velocityX, velocityY, size));
            }
        }

        update() {
            this.particles.forEach(particle => particle.update());
        }

        draw(ctx) {
            this.particles.forEach(particle => particle.draw(ctx));
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // 只清除路径，保留透明背景

        fireworks.forEach((firework, index) => {
            if (firework.particles[0].opacity <= 0) {
                fireworks.splice(index, 1);
            } else {
                firework.update();
                firework.draw(ctx);
            }
        });

        requestAnimationFrame(animate);
    }

    function spawnFirework() {
        if (fireworks.length < maxFireworks) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            fireworks.push(new Firework(x, y));
        }
    }

    // 启动动画并生成烟花
    animate();
    setInterval(spawnFirework, spawnInterval);
}
