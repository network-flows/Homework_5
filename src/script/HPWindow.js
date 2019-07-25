export default class HPWindow extends Laya.Sprite 
{
    constructor()
    {
        super()
        this.HP=0;
        this.armor=0;
        this.update()
        Laya.stage.addChild(this);
        this.zOrder=1000;
        this.size(200,120);
    }
    update()
    {
        if(this.HP!=the_Hero.HP||this.armor!=the_Hero.armor)
        {
            const Text=Laya.Text
            this.HP=the_Hero.HP;
            this.armor=the_Hero.armor;
            let len_HP=(167-78)/the_Hero.HP_max*the_Hero.HP;
            this.graphics.drawRect(78,30,167-78,17,"#555555")   //78,32  ---167,47
            this.graphics.drawRect(78,30,len_HP,17,"#FFFF00")   //78,32  ---167,47

            let len_armor=(167-78)/the_Hero.armor_max*the_Hero.armor;
            this.graphics.drawRect(78,79,167-78,17,"#555555")   //78,32  ---167,47
            this.graphics.drawRect(78,79,len_armor,17,"#FFFF00")   //78,78  ---167,93
            this.loadImage("res/HPWindow/HPWindow.png");
        }
    }
}