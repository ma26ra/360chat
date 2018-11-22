Panoramaview = function ( videoElement, target ) {

  this.videoElement = videoElement;
  this.scene = new THREE.Scene();
  var geometry = new THREE.SphereGeometry( 100, 32, 32, 0 );
  geometry.scale( - 1, 1, 1 );
  var faceVertexUvs = geometry.faceVertexUvs[ 0 ];
  for ( i = 0; i < faceVertexUvs.length; i++ ) {
    var uvs = faceVertexUvs[ i ];
    var face = geometry.faces[ i ];
    for ( var j = 0; j < 3; j ++ ) {
      var x = face.vertexNormals[ j ].x;
      var y = face.vertexNormals[ j ].y;
      var z = face.vertexNormals[ j ].z;
        if (i < faceVertexUvs.length / 2) {
        var correction = (x == 0 && z == 0) ? 1 : (Math.acos(y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
        uvs[ j ].x = x * (428 / 1920) * correction + (480 / 1920);
        uvs[ j ].y = z * (428 / 1080) * correction + (600 / 1080);
      } else {
        var correction = ( x == 0 && z == 0) ? 1 : (Math.acos(-y) / Math.sqrt(x * x + z * z)) * (2 / Math.PI);
        uvs[ j ].x = -1 * x * (428 / 1920) * correction + (1440 / 1920);
        uvs[ j ].y = z * (428 / 1080) * correction + (600 / 1080);
      }
    }
  }
  geometry.rotateZ(-Math.PI / 2);

  this.texture = new THREE.Texture(videoElement);
  this.texture.generateMipmaps = false;
  this.texture.magFilter = THREE.LinearFilter;
  this.texture.minFilter = THREE.LinearFilter;

  var material = new THREE.MeshBasicMaterial({map: this.texture});
  var sphere = new THREE.Mesh( geometry, material );
  this.scene.add( sphere );

  this.camera = new THREE.PerspectiveCamera(75, videoElement.clientWidth / videoElement.clientHeight, 1, 1000);
  this.camera.position.set(0,0,0.1);
  this.camera.lookAt(sphere.position);

  this.renderer = new THREE.WebGLRenderer();
  this.renderer.setSize(videoElement.clientWidth,videoElement.clientHeight);
  this.renderer.setClearColor({color: 0x000000});
  target.appendChild(this.renderer.domElement);
  this.renderer.render(this.scene,this.camera);

  this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

};

Panoramaview.prototype = {
  render: function() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.texture) this.texture.needsUpdate = true;
    }
    this.renderer.render(this.scene,this.camera);
    this.controls.update();
  }
};
