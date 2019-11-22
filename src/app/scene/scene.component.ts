import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer', {
    static: false
  }) rendererContainer: ElementRef;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;

  constructor() {
    // Create the scene
    this.scene = new THREE.Scene();

    // Create the perspective camera (FOV, Aspect Ratio, Near Clipping, Far Clipping)
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 1000;

    // Create a cube
    const geometry = new THREE.BoxGeometry(200, 200, 200);
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true
    });
    this.mesh = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    this.scene.add(this.mesh);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Create the renderer given the needed size
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // User the redererContainer as the location of the scene
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);

    // Call animate function
    this.animate();
  }

  animate() {
    // Tell the browser we wish to perform animations
    window.requestAnimationFrame(() => this.animate());

    // Rotate the cube and render again
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;
    this.renderer.render(this.scene, this.camera);
  }
}
