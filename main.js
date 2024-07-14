class Hero {
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
    this.canFly = false;
    this.shield = false;
  }
  attacked(damage) {
    //daca eroul are proprietatea canFly sunt 50% sanse sa evite damage-ul
    if (this.canFly) {
      let chance = Math.random();
      if (chance > 0.5) {
        console.log(this.name + " frew away.");
        damage = 0;
      }
    }

    if (this.shield) {
      console.log(this.name + " defends with a shield.");
      damage *= 0.8;
    }

    this.hp -= damage;
    console.log(
      this.name +
        " has been attacked. HP reduced by: " +
        damage +
        ". HP remaining" +
        this.hp +
        "."
    );
  }
}

class Dwarf extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.shield = true;
  }

  attack(otherHero) {
    let damage = 10;
    console.log(this.name + " attacked with damage: " + damage + ".");
    otherHero.attacked(damage);
  }
}

class Sprite extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.canFly = true;
  }

  attack(otherHero) {
    let damage = 15;
    console.log(this.name + " attacked with damage: " + damage + ".");
    otherHero.attacked(damage);
  }
}

class Dragon extends Hero {
  constructor(name, hp) {
    super(name, hp);
    this.canFly = true;
    this.shield = true;
  }

  attack(otherHero) {
    let damage = 5;
    console.log(this.name + " attacked with damage " + damage + ".");
    otherHero.attacked(damage);
  }
}

//Class Fight conduce batalia dintre eroi
class Fight {
  constructor(hero1, hero2) {
    this.hero1 = hero1;
    this.hero2 = hero2;
    //this.turn este folosit in determinarea a cui tura este si poate avea valori intre 0 si 1
    this.turn = 0;
  }

  //se executa un singur atac
  performAttack() {
    if (this.turn === 0) {
      this.hero1.attack(this.hero2);
    } else {
      this.hero2.attack(this.hero1);
    }
  }

  changeTurn() {
    //initial this.turn este 0 => this.turn este egal cu 1-0 => this.turn = 1
    //urmatoarea data cand se schimba tura, this.turn = 1-(this.turn-ul anterior care este egal cu 1) => this.turn = 0
    this.turn = 1 - this.turn;
  }
  //determinam cine este castigatorul:
  findWinner() {
    let findWinner = "";
    if (this.hero1.hp > 0) {
      findWinner = this.hero1.name + " won with " + this.hero1.hp + " HP.";
      console.log(findWinner);
      return findWinner;
    } else if (this.hero2.hp > 0) {
      findWinner = this.hero2.name + " won with " + this.hero2.hp + " HP.";
      console.log(findWinner);
      return findWinner;
    } else {
      findWinner = "No hero left alive!";
      console.log(findWinner);
      return findWinner;
    }
  }

  go() {
    do {
      //executam atacul
      this.performAttack();

      // schimb tura
      this.changeTurn();
    } while (this.hero1.hp > 0 && this.hero2.hp > 0);

    this.findWinner();
  }
}

let dwarf = new Dwarf("Khurbada Oakenguard Dwarf", 50);
let sprite = new Sprite("Prinna Bumblelace Sprite", 40);
let dragon = new Dragon("Bolshack, The Fire Dragon", 60);

//cream o lupta noua si ii dam drumul
let epicFight = new Fight(dwarf, dragon);
epicFight.go();
