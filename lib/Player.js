export class Player {
	constructor(id, name) {
		this.id = id;
		this.user = name;
		this.x = Math.floor(Math.random() * 100) + 1;
		this.y = Math.floor(Math.random() * 100) + 1;
	}
	getCoordinates() {
		return [this.x,this.y];
	}
}