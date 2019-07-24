import DragPoint from "./DragPoint"

export default class Wheel extends Laya.Sprite
{
	constructor(x,y,r,hasSp)
	{
		super();
		const 
			Sprite = Laya.Sprite,
			Event = Laya.Event;
		Laya.stage.addChild(this);
		
		this.size(2*r,2*r);
		this.pivot(r,r);
		this.graphics.drawCircle(r,r,r,"#FFFFFF");
		this.pos(x,y);
		this.r=r;
        this.ID=null;
        this.alpha=0.4;
		this.mouseThrough=true;
		this.hasSp=hasSp;
		if(this.hasSp)
			this.sp=new DragPoint(this.x,this.y,this.r/5);
	}

	onStartDrag(e){
		this.ID=e.touchId;
		this.moveTo(e.stageX,e.stageY);
	}

	onStopDrag()
	{
		this.ID=null;
		if(this.hasSp)
			this.sp.pos(this.x,this.y)
	}

	moveTo(x,y)
	{
		if(this.hasSp)
		{
			let dx=x-this.x;
			let dy=y-this.y;

			let R=Math.sqrt(dx*dx+dy*dy);
			let dx2=R>this.r? dx*this.r/R: dx;
			let dy2=R>this.r? dy*this.r/R: dy;
			this.sp.pos(this.x+dx2,this.y+dy2)
		}
	}
}
