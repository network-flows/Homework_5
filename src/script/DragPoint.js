export default class DragPoint extends Laya.Sprite  //no events
{
	constructor(x,y,r)
	{
		super();
		Laya.stage.addChild(this);
		
		this.size(2*r,2*r);
		this.pivot(r,r);
		this.graphics.drawCircle(r,r,r,"#FFFF00");
        this.pos(x,y);
        this.alpha=0.2;
		this.r=r;
		this.mouseThrough=true;
	}
}