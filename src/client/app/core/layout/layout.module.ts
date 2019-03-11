import { NgModule } from '@angular/core';
import { SharedModule } from 'src/client/app/shared/shared.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';

const components = [LayoutComponent, HeaderComponent, FooterComponent];

@NgModule({
    declarations: components,
    imports: [SharedModule],
    exports: components,
    providers: []
})
export class LayoutModule {}
