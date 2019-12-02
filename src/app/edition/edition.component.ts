import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';

@Component({
  selector: 'app-edition',
  templateUrl: './edition.component.html',
  styleUrls: ['./edition.component.scss']
})
export class EditionComponent implements OnInit {

  waitingForData = true;
  //index = new FormControl('');
  pMenuVisible = false;
  paragraphs:any = [];
  data:any = []
  contentReceived = false;
  showAllText = false;
  pIndexIsChosen = false;
  pIndex = null;
  textOfChosenParagraph = "Wert von textOfChosenParagraph";
  firstName = "";
  leText = "Initialer Text";

  @ViewChild('rendererContainer', { static: false }) rendererContainer: ElementRef;
  title = 'dHKG-Jeremias-Gotthelf';
  renderer = new THREE.WebGLRenderer();
    scene = null;
    camera = null;
    mesh = null;


  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    this.mesh = new THREE.Mesh(geometry, material);

    this.scene.add(this.mesh);
  }

  ngOnInit() {
    //this.getDocumentFromServer(1);
    this.getTitlesAndUrlsOfAllDocuments();

    //const imgs = ['cat.jpg', 'dog.jpg', 'eagle.jpg', 'elephant.jpg', 'grasshopper.jpg', 'octopus.jpg', 'owl.jpg', 'panda.jpg', 'squirrel.jpg', 'tiger.jpg', 'whale.jpg'];
    const imgs = ['jg_alpenrosen_1849_176x176.jpg', 'absign_264x161.jpg', 'Bilder_und_Sagen_6_160x258.jpg', 'Pupikofer_Schriftvorlagen.jpg', 'Dorfschule_264x222.jpg', 'RAN10_ArmenerziehungsanstaltTrachselwald.png', 'cat.jpg', 'njg_160x202.jpg', '2019-08-19-10.46.48_300x300.jpg', 'NBK184001_264x317.jpg', 'oxy2018.png'];
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
        /*const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth / 2.0, window.innerHeight / 2.0);
        document.body.appendChild( renderer.domElement );
        */sprite.scale.set(12, 12, 0);
        obj.add(sprite);
        return obj;
      })
      .graphData(gData);

      //var renderer = new THREE.WebGLRenderer();
      
  }

ngAfterViewInit() {
    //this.renderer.setSize(window.innerWidth, window.innerHeight);
    console.log("ngAfterViewInit meldet");
    this.renderer.setSize(1000, 400);
    //this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    //this.animate();
}

animate() {
  console.log("animate meldet");
    window.requestAnimationFrame(() => this.animate());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.setSize(400, 400);
    this.renderer.render(this.scene, this.camera);
}


  onTextChange(value) {
    //console.log(value);
    console.log("onTextChange meldet: " + this.pIndex);
    this.pIndex = value;
    //console.log(this.pIndex);
    if (this.pIndex == 0)
    {
      console.log("pIndex ist 0: " + this.pIndex);
      this.pIndexIsChosen = false;
    }
    else {
      console.log("pIndex ist nicht 0: " + this.pIndex);
      this.pIndexIsChosen = true;
      this.textOfChosenParagraph = this.paragraphs.body.p[this.pIndex - 1].text;
    }
    console.log("pIndexIsChosen = " + this.pIndexIsChosen);
  }

  getTitlesAndUrlsOfAllDocuments() {
    console.log("Klasse edition.component.ts, Methode getTitlesAndUrlsOfAllDocuments meldet");
    this.rest.getTitlesAndUrlsOfAllDocuments().subscribe((data: {}) => {
      //console.log("data = " + data[3][1][1]);
      this.waitingForData = false;
      this.data = data;
      //console.log("Zweites Werk:");
      //console.log(this.data.collection[1].document[1]);
    });
  }

  getDocumentFromServer(index) {
    console.log("getDocumentFromServer meldet");
    this.pMenuVisible = this.pIndexIsChosen = this.contentReceived = false;
    this.pIndex = null;
    this.data = [];
    console.log("Data will be processed ...");
    this.rest.getDocument(index).subscribe((data: {}) => {
      console.log("getDocumentFromServer meldet");
      this.data = data;
      console.log("data = " + data[3][1][1]);
      console.log("data = " + data[3][1][1][1]['xml:id']);

      /* Oldschool JSON, direct serialization from eXist-db
      this.firstName = this.data.TEI.teiHeader.fileDesc.editionStmt.respStmt[1].name;
      console.log("getDocumentFromServer meldet 1: " + this.firstName);
      this.firstName = this.data.TEI.text.body.div.p[0]['xml:id'];
      console.log("getDocumentFromServer meldet 2: " + this.firstName);
      this.firstName = this.data.TEI.text.body.div.p[0]['#text'][3];
      console.log("getDocumentFromServer meldet 3: " + this.firstName);
      console.log("getDocumentFromServer meldet 4: Länge = " + this.data.TEI.text.body.div.p[0]['#text'].length);
      this.firstName = this.data.TEI.text.body.div.p[0]['app'][1].lem;
      console.log("getDocumentFromServer meldet 5: " + this.firstName);
      this.firstName = this.data.TEI.teiHeader.fileDesc.editionStmt.respStmt[1].name;
      console.log("getDocumentFromServer meldet 6: " + this.firstName);
      */
      //this.pMenuVisible = true;
      console.log(this.pMenuVisible);
      //this.contentReceived = true;
      this.createTheText();
    });
  }

  createTheText() {
    console.log("createTheText meldet; firstName = " + this.firstName);
    this.leText = "";
    /*for (var i=0; i < this.data.TEI.text.body.div.p[0]['#text'].length; i++) {
      this.leText = this.leText.concat(this.data.TEI.text.body.div.p[0]['app'][0].lem);
    }*/
    console.log(this.leText);
  }

  getDocumentParagraphsFromServer(index) {
    console.log("getDocumentParagraphsFromServer meldet");
    this.showAllText = this.pMenuVisible = this.pIndexIsChosen = this.contentReceived = false;
    this.pIndex = null;
    this.paragraphs = [];
    this.rest.getDocumentParagraphs(index).subscribe((data: {}) => {
      this.paragraphs = data;
      console.log("First paragraph: " + this.paragraphs.body.p[0].text);
      this.pMenuVisible = true;
      console.log(this.pMenuVisible);
      this.contentReceived = true;
    });
  }
}