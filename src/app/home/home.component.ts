import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    const imgs = ['cat.jpg', 'dog.jpg', 'eagle.jpg', 'elephant.jpg', 'grasshopper.jpg', 'octopus.jpg', 'owl.jpg', 'panda.jpg', 'squirrel.jpg', 'tiger.jpg', 'whale.jpg'];
    // Random connected graph
    const gData = {
      nodes: imgs.map((img, id) => ({ id, img })),
      links: [...Array(imgs.length).keys()]
        .filter(id => id)
        .map(id => ({
          source: id,
          target: Math.round(Math.random() * (id-1))
        }))
    };
    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
      .nodeThreeObject(({ img }) => {
        // use a sphere as a drag handle
        const obj = new THREE.Mesh(
          new THREE.SphereGeometry(7),
          new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
        );
        // add img sprite as child
        const imgTexture = new THREE.TextureLoader().load(`assets/img/${img}`);
        const material = new THREE.SpriteMaterial({ map: imgTexture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(12, 12, 0);
        obj.add(sprite);
        return obj;
      })
      .graphData(gData);


  }

}
