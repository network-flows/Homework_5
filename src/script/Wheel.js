import DragPoint from "./DragPoint"

export default class Wheel extends Laya.Sprite
{
	constructor(x,y,r)
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
        this.alpha=0.2;
		this.mouseThrough=true;
		this.setup();
	}

	setup()
	{
		this.sp=new DragPoint(this.x,this.y,this.r/5);
	}

	onStartDrag(e){
		this.ID=e.touchId;
		this.moveTo(e.stageX,e.stageY);
	}

	onStopDrag()
	{
		this.ID=null;
		this.sp.pos(this.x,this.y)
	}

	moveTo(x,y)
	{
		this.sp.pos(x,y)
	}
}
