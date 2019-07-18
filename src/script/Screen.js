import DragPoint from "./DragPoint"
import Wheel from "./Wheel"

export default class Screen extends Laya.Sprite  //screen
{
	constructor(w,h)
	{
		super();
		const 
			Sprite = Laya.Sprite,
			Event = Laya.Event;
		this.w=w;
		this.h=h;

		Laya.stage.addChild(this);
		this.size(w,h);
		this.pos(0,0);

		this.on(Event.MOUSE_UP,this,this.onMouseUp);
		this.on(Event.MOUSE_MOVE,this,this.onMouseMove);
		this.on(Event.MOUSE_DOWN,this,this.onMouseDown);
		this.on(Event.MOUSE_OUT,this,this.onMouseUP);

		this.whl=new Wheel(this.w/4,this.h*3/4,this.w/15);
        this.atk=new Wheel(this.w*3/4,this.h*3/4,this.w/15);
        this.atk.alpha=0.8
	}

	onMouseDown(e){
		if((this.whl.x-e.stageX)*(this.whl.x-e.stageX)+(this.whl.y-e.stageY)*(this.whl.y-e.stageY)<=this.whl.r*this.whl.r)
		{
			this.whl.onStartDrag(e);
		}
		else if((this.atk.x-e.stageX)*(this.atk.x-e.stageX)+(this.atk.y-e.stageY)*(this.atk.y-e.stageY)<=this.atk.r*this.atk.r)
		{
			this.atk.onStartDrag(e);
		}
	}
	onMouseUp(e)
	{
		if(this.whl.ID==e.touchId)
		{
			this.whl.onStopDrag();
		}
		else if(this.atk.ID==e.touchId)
		{
			this.atk.onStopDrag();
		}
	}
	onMouseMove(e)
	{
		if(this.whl.ID==e.touchId)
		{
			this.whl.moveTo(e.stageX,e.stageY);
		}
		else if(this.atk.ID==e.touchId)
		{
			this.atk.moveTo(e.stageX,e.stageY);
		}
	}

	getVelosity()
	{
        return {
            x : this.whl.sp.x - this.whl.x,
            y : this.whl.sp.y - this.whl.y
        };
	}

	getShoot()
	{
        return this.atk.ID !== null;
	}
}
