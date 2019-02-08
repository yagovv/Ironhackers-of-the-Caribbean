class Keys {
  constructor(game) {
    this.KeyW = false;
    this.KeyA = false;
    this.KeyS = false;
    this.KeyD = false;
    this.ArrowUp = false;
    this.ArrowDown = false;
    this.SPACE_KEY = false;
    this.ArrowRight = false;
    this.ArrowLeft = false;
    this.KeyF = false;
    this.KeyG = false;
    this.Slash = false;
    this.Period = false;
  }
  setTrue(e) {
    switch (event.type) {
      case "keydown":
        this[e.code] = true;
        break;
      case "keyup":
        this[e.code] = false;
        break;
    }
  }
}
