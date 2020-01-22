import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';

@Component({
  selector: 'app-suche',
  templateUrl: './suche.component.html',
  styleUrls: ['./suche.component.scss']
})
export class SucheComponent {
  @ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;

  images = ['jg_alpenrosen_1849_176x176.jpg', 'absign_264x161.jpg', 'Bilder_und_Sagen_6_160x258.jpg', 'Pupikofer_Schriftvorlagen.jpg', 'Dorfschule_264x222.jpg', 'RAN10_ArmenerziehungsanstaltTrachselwald.png', 'cat.jpg', 'njg_160x202.jpg', '2019-08-19-10.46.48_300x300.jpg', 'NBK184001_264x317.jpg', 'oxy2018.png'];
  /*
  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  */

  gData;

  constructor() {

  }

  /*
  ngOnInit() {
    console.log("SucheComponent ngOnInit meldet");
  }
  */

  ngAfterViewInit() {

    this.gData = {
      nodes: this.images.map((img, id) => ({ id, img })),
      links: [...Array(this.images.length).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };

    const Graph = ForceGraph3D()
    (document.getElementById('threeDgraph')).nodeLabel("test")
    .nodeThreeObject(({ img }) => {
      // use a sphere as a drag handle
      const obj = new THREE.Mesh(
        new THREE.SphereGeometry(7),
        new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
      );

      // add img sprite as child
      const imgTexture = new THREE.TextureLoader().load(`./assets/img/${img}`);
      const material = new THREE.SpriteMaterial({ map: imgTexture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(12, 12, 12);
      obj.add(sprite);
      return obj;
    })
    .graphData(this.gData)
    .width(500)
    .showNavInfo(true)
    .backgroundColor("#044918")
    .nodeLabel('test');

  }

  animate() {
    console.log("animate meldet");
    /*
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
    */
  }

}