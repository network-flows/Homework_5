import Beings from "./Beings"

export default class Thing extends Beings{
    constructor(){
        super();
        this.sentence = "还没有设置句子！";
    }

    action(){
        if(player_is_nearby()){
            this.set_sentence();
            if(this.click_the_thing()){
                this.use_it();
            }
        }
        else{
            this.hide_sentence();

        }
    }

    dead(){
        Thing_list.splice(Bullet_list.indexOf(this));

    }

    set_sentence(){
        /*
        game.sentence = this.sentence;
        */
    }

    hide_sentence(){
        /*
        game.sentence = "";
        */
    }

    player_is_nearby(){
        return false;
    }

    click_the_thing(){
        /*
        if(game.button_clicked){
            game.button_clicked = false;
            return true;
        }
        else{
            return false;
        }
        */
    }

    use_it(){

    }
}