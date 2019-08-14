import { Direction } from './direction';

export class Sort {
    properties: string[];
    direction: Direction;

    constructor(properties: string[] = [], direction: Direction = Direction.ASC) {
        this.properties = properties;
        this.direction = direction;
    }
}
