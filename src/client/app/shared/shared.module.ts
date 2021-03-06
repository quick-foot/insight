import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material.module';

const modules = [CommonModule, MaterialModule, RouterModule];

@NgModule({
    declarations: [],
    imports: modules,
    exports: modules,
    providers: []
})
export class SharedModule {}
