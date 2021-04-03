function initCity(scene) {
    var material = null;
    function getCity() {
        var uniform = {
            u_color: { value: new THREE.Color("#5588aa") },
            u_tcolor: { value: new THREE.Color("#ff9800") },
            u_r: { value: 0.25 },
            u_length: { value: 20 },//扫过区域
            u_max: { value: 300 }//扫过最大值
        };
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
                        float op = sin( (u_r - uLength) / u_length ) * 0.6 + 0.3 ;
                        uOpacity = op; 
                        if( vp.y<0.0){
                            vColor  = u_tcolor * 0.6; 
                        }else{ 
                            vColor = u_tcolor;
                        };
                    } 
                    gl_FragColor = vec4(vColor,uOpacity);
                }
            `
        }

        material = new THREE.ShaderMaterial({
            vertexShader: Shader.vertexShader,
            fragmentShader: Shader.fragmentShader,
            side: THREE.DoubleSide,
            uniforms: uniform,
            transparent: true,
            depthWrite: false,
        });
        var loaderobj = new THREE.OBJLoader()
        loaderobj.load('./assets/city-gry1.obj', function (object) {
            object.children.forEach(element => {
                element.material = material
            });
            let size = 0.3;
            object.scale.set(size, size, size)
            scene.add(object);
            object.name = "city";
        });

     

			/*
			geometryP1 = new THREE.BoxGeometry(-10,-10,10);	 
			var materialP1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 ,side:THREE.DoubleSide} );
			circleP1 = new THREE.Mesh( geometryP1, materialP1 );			
			var group2 = new THREE.Group();
			group.add(group2);
			group2.add(circleP1);*/
			
			//readcsv
			var loader = new THREE.FileLoader(); 

			//load a text file and output the result to the console
			loader.load(
				// resource URL
				'data2.csv',
				// onLoad callback
				function ( data ) 
				{
					// output the text to the console
					console.log( data )
					var csvarry = data.split("\r\n");
					for(var i = 1;i<csvarry.length;i++)
					{
						var data = {};
						var temp = csvarry[i].split(",");
						console.log( temp );
						//adding objects
						var g = new THREE.BoxGeometry(1,1,1);
						//var m = new THREE.MeshBasicMaterial( { color: 0x0000ff ,side:THREE.DoubleSide} );
						var c = new THREE.Mesh( g, material );			
						//c.position.set(0, 0, 0);
						var x = parseFloat(temp[0])*1;
						var y = parseFloat(temp[1])*1;
						var z = parseFloat(temp[2])*100;
						console.log( x );
						console.log( y );
						console.log( z );

						c.position.set(x,z,y); 
						//geometryP.rotateY(Math.PI/2);
						//var group1 = new THREE.Group();
                        group = new THREE.Group();
                        scene.add(group);
						group.add(c);
					
					
					};

				}
			);

    }
    this.animation = function (dalte) {
        if (material) {
            material.uniforms.u_r.value += dalte * 50;
            if (material.uniforms.u_r.value >= 300) {
                material.uniforms.u_r.value = 20
            }
        }
    }
    function load() {
        getCity()
    }
    load()
}