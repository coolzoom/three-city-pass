![掠过效果](https://stonerao.github.io/three-city-pass/city.gif)

### 特效

使用Obj 模型 + shader 实线 
加载 obj 格式文件加载到 scene中；
使用 ShaderMaterial 材质

```javascript
var Shader = {
    vertexShader: ` 
        varying vec3 vp;
        void main(){
           vp = position; 
           gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vp;
        uniform vec3 u_color;
        uniform vec3 u_tcolor;
        uniform float u_r;
        uniform float u_length;
        uniform float u_max;
        float getLeng(float x, float y){
            return  sqrt((x-0.0)*(x-0.0)+(y-0.0)*(y-0.0));
        }
        void main(){ 
            float uOpacity = 0.3; 
            vec3 vColor = u_color;
            float uLength = getLeng(vp.x,vp.z);
            if ( uLength <= u_r && uLength > u_r - u_length ) { 
                float op = sin( (u_r - uLength) / u_length ) ;
                uOpacity = op; 
                if( vp.y<0.0){
                    vColor = u_color * op;
                }else{ 
                    vColor = u_tcolor;
                };
            } 
            gl_FragColor = vec4(vColor,uOpacity);
        }
    `
}
var material = new THREE.ShaderMaterial({
   	vertexShader: Shader.vertexShader,
    fragmentShader: Shader.fragmentShader,
    side: THREE.DoubleSide,
    uniforms: {
	     u_color: { value: new THREE.Color("#5588aa") },
	     u_tcolor: { value: new THREE.Color("#f55c1a") },
	     u_r: { value: 0.25 },
	     u_length: { value: 20 },//扫过区域
	     u_max: { value: 300 }//扫过最大值
	},
   	transparent: true,
    depthWrite: false,
});
//rennder 
material.uniforms.u_r.value += dalte * 100;
    if (material.uniforms.u_r.value >= 300) {
       material.uniforms.u_r.value = 20
	}
}
```


## start

- `npm install -g cnpm --registry=https://registry.npm.taobao.org`
- `set-ExecutionPolicy RemoteSigned` , set all to A
- `npm install electron-prebuilt -g`
- `electron .`


## deps
- install node and npm
`https://nodejs.org/en/download/`

- 换源
`npm config set registry http://registry.npm.taobao.org`

- 安装yarn(npm 替代工具)
```
npm install -g yarn //换源

yarn config get registry  // 查看yarn当前镜像源
yarn config set registry https://registry.npm.taobao.org/  // 设置yarn镜像源为淘宝镜像

```

- 全局安装electron
`yarn global add electron`

- 创建app
`https://www.electronforge.io/`
`yarn create electron-app my-app`

- 卡住解决方案
```
https://blog.csdn.net/xia_yanbing/article/details/113662899
在Administrator/.npmrc里做如下设置，
electron_mirror="https://npm.taobao.org/mirrors/electron/"
如果您使用的是yarn，请将 ~/.npmrc里添加以下配置
ELECTRON_MIRROR "https://npm.taobao.org/mirrors/electron/"
```

- 测试
```
cd my-app
yarn start
```

- 打包
`yarn make`