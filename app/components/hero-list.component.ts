/**
 * Created by slashhuang on 16/9/25.
 */

// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Hero, HeroService }  from './hero.service';
@Component({
    providers:[HeroService],
    template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
  `
})
export class HeroListComponent implements OnInit {
    heroes: Hero[];
    private selectedId: number;
    constructor(
        private service: HeroService,
        private route: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.selectedId = +params['id'];
            this.service.getHeroes()
                .then(heroes => this.heroes = heroes);
        });
    }
    isSelected(hero: Hero) { return hero.id === this.selectedId; }
    onSelect(hero: Hero) {
        this.router.navigate(['/hero', hero.id]);
    }
}

