(function() {
    //宣告變數
    let width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

    // 主函數，初始化頁面和事件監聽
    initHeader();
    addListeners();

    // 初始化頁面設定
    function initHeader() {
        // 取得視窗的寬度和高度
        width = window.innerWidth;
        height = 400;
        target = {x: 0, y: height};  // 設定目標點在頁面底部

        // 取得 'large-header' 元素並設定其高度
        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+'px';

        // 設定畫布 (canvas) 的大小並取得繪圖上下文
        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // 建立粒子（圓點）陣列
        circles = [];
        for(var x = 0; x < width*0.5; x++) {
            var c = new Circle();
            circles.push(c);  // 將每個粒子推入陣列
        }
        animate();  // 開始動畫
    }

    // 加入滾動和視窗調整大小的事件監聽
    function addListeners() {
        window.addEventListener('scroll', scrollCheck);  // 監聽滾動事件
        window.addEventListener('resize', resize);  // 監聽視窗大小改變事件
    }

    // 檢查滾動狀態以決定是否繼續動畫
    function scrollCheck() {
        if(document.body.scrollTop > height) animateHeader = false;
        else animateHeader = true;
    }

    // 調整視窗大小時更新畫布和頁面高度
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height+'px';
        canvas.width = width;
        canvas.height = height;
    }

    // 動畫函數，不斷重繪畫布上的粒子
    function animate() {
        if(animateHeader) {  // 當animateHeader為true時繼續動畫
            ctx.clearRect(0,0,width,height);  // 清除畫布
            for(var i in circles) {
                circles[i].draw();  // 繪製每個粒子
            }
        }
        requestAnimationFrame(animate);  // 以60fps進行動畫
    }

    // 粒子（圓點）物件的構造函數
    function Circle() {
        var _this = this;

        // 自我調用函數初始化粒子
        (function() {
            _this.pos = {};  // 粒子位置物件
            init();  // 初始化粒子屬性
        })();

        // 初始化粒子屬性
        function init() {
            _this.pos.x = Math.random()*width;  // 粒子隨機生成在畫布的水平位置
            _this.pos.y = height+Math.random()*100;  // 粒子初始位置在畫布底部以下
            _this.alpha = 0.1+Math.random()*0.3;  // 粒子的透明度
            _this.scale = 0.1+Math.random()*0.5;  // 粒子的大小比例
            _this.velocity = Math.random();  // 粒子的速度
        }

        // 繪製粒子
        this.draw = function() {
            if(_this.alpha <= 0) {
                init();  // 如果透明度減至0，則重新初始化粒子
            }
            _this.pos.y -= _this.velocity;  // 粒子向上移動
            _this.alpha -= 0.0005;  // 逐漸減少粒子的透明度
            ctx.beginPath();  // 開始繪製
            ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);  // 繪製圓形
            ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';  // 設定填充顏色
            ctx.fill();  // 填充圓形
        };
    }
})();