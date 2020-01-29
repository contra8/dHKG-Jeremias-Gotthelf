import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import SpriteText from 'three-spritetext';
import ForceGraph3D from '3d-force-graph';

@Component({
  selector: 'app-korrespondenz',
  templateUrl: './korrespondenz.component.html',
  styleUrls: ['./korrespondenz.component.scss']
})
export class KorrespondenzComponent implements OnInit {

  //@ViewChild('graphContainer', { static: false }) graphContainer: ElementRef;

  //images = ['jg_alpenrosen_1849_176x176.jpg', 'absign_264x161.jpg', 'Bilder_und_Sagen_6_160x258.jpg', 'Pupikofer_Schriftvorlagen.jpg', 'Dorfschule_264x222.jpg', 'RAN10_ArmenerziehungsanstaltTrachselwald.png', 'cat.jpg', 'njg_160x202.jpg', '2019-08-19-10.46.48_300x300.jpg', 'NBK184001_264x317.jpg', 'oxy2018.png'];
  /*
  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  */
 universeWidth = 1;
 universeHeight = 500;

  gData;

  constructor() {}

  ngOnInit() {
    console.log("KorrespondenzComponent ngOnInit meldet");
  }

  ngAfterViewInit() {

    //console.log("korrespondenz.component.ts: 1) " + document.getElementById('welcomeText').offsetWidth);
    //console.log("p.welcomeText: " + this.welcomeText.nativeElement.width);
    //this.universeWidth = window.innerWidth; // - document.getElementById('welcomeText').offsetWidth;
    //this.universeWidth = document.getElementById('graphContainer').offsetWidth;

    console.log("korrespondenz.component.ts: 2)");

    const Graph = ForceGraph3D()
      (document.getElementById('3d-graph'))
        .jsonUrl('./assets/json/miserables.json')
        .nodeAutoColorBy('group')
        .nodeThreeObject(node => {
          // use a sphere as a drag handle
          const obj = new THREE.Mesh(
            new THREE.SphereGeometry(10),
            new THREE.MeshBasicMaterial({ depthWrite: false, transparent: true, opacity: 0 })
          );
          console.log("korrespondenz.component.ts: 3)");

          // add text sprite as child
          const sprite = new SpriteText(node.id);
          sprite.color = node.color;
          sprite.textHeight = 8;
          obj.add(sprite);

          return obj;
        });

    // Spread nodes a little wider
    Graph.d3Force('charge').strength(-120);
    console.log("korrespondenz.component.html ngAfterViewInit meldet");
  }

  /*
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    console.log("onResize: " + event);
    this.universeWidth = window.innerWidth - document.getElementById('welcomeText').offsetWidth;
    this.universeWidth = document.getElementById('graphContainer').offsetWidth;
  }
  */

}