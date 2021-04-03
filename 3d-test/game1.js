let scene, camera, renderer, controls, light, model,canvas;

      function init() {

        //新场景
        scene = new THREE.Scene();
        //scene.background = new THREE.Color(0x5fafaf);

        //新建相机
        // camera = new THREE.PerspectiveCamera(40,window.innerWidth/window.innerHeight,20,5000);
        camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 20, 1000 );
        //camera.position.set(-20,35,20);//x    z   y
        //蓝色是Z +向前 -向后
        camera.position.z = 50; 
        // x像红色转 +向右 -向左
        camera.position.x = 5; 
        // y向上下翻转 +向下翻转 -仰视翻转
        camera.position.y = 5; 
        //控制器
        controls = new THREE.OrbitControls(camera);

        

        // 设置光
        light = new THREE.SpotLight(0xfffceb,0.9);
        light.position.set(-50,50,50);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024*4;
        light.shadow.mapSize.height = 1024*4;
        scene.add( light );

        //添加环境光
        hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
        hemiLight.position.set(0, 100, 0);
        scene.add(hemiLight);

        //添加坐标轴
        // axesHelper = new THREE.AxesHelper( 5 );
        // axesHelper.position.set(0,0,0);
        // scene.add( axesHelper );

        //渲染器 
        // { alpha: true }添加透明通道
        renderer = new THREE.WebGLRenderer({
           alpha: true ,
          //渲染器渲染导canvas
           canvas: document.getElementById('mycanvas'),
          // div:document.getElementById("id").appendChild(renderer.domElement),
            antialias: true
          });

        // 清除背景颜色
        renderer.setClearColor( 0x000000, 0);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        renderer.toneMappingExposure = 2.3;
        renderer.setSize(window.innerWidth,window.innerHeight);
        // document.getElementById('id').appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;




        // 模型读取器
        loader = new THREE.GLTFLoader();
        loader.load('model/scene.gltf', result => { 
          model = result.scene.children[0]; 
          model.position.set(0,1.5,0);
          model.scale.set(2.3,2.3,2.3);
          model.traverse(n => { if ( n.isMesh ) {
            n.castShadow = true; 
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 1; 
          }});
          scene.add(model);

          animate();
        });
        loader.load('model/scene.gltf', result => { 
          model1 = result.scene.children[0]; 
          model1.position.set(-2,1,0);
          model1.scale.set(2,2,2);
          model1.traverse(n => { if ( n.isMesh ) {
            n.castShadow = true; 
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 1; 
          }});
          scene.add(model1);

          animate();
        });

      }
      function animate() {        
        renderer.render(scene,camera);
        renderer.setSize(window.innerWidth,window.innerHeight); //更新渲染器
        camera.aspect = window.innerWidth/window.innerHeight;  //更新相机
          model.rotation.z += 0.002;
          // model1.rotation.z -= 0.002;
          light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
          camera.updateProjectionMatrix (),  //更新相机
        );
        requestAnimationFrame(animate,);
      }
      init();