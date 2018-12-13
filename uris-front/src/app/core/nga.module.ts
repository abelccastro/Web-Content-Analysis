import { NgModule, ModuleWithProviders }      from '@angular/core';
import { CommonModule, DatePipe }  from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgUploaderModule } from 'ngx-uploader';
import { AlertModule,ModalModule } from 'ng2-bootstrap';

import {
  BaThemeConfig
} from './core.config';

import {
  BaThemeConfigProvider
} from './core.configProvider';

import {
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  BaAlerta,
  BaFileUploaderCmp,
  BaHabilitarBotonCmp,
  BaConfirmDialogCmp,
  BaAutoComplete,
  BaVisualizadorHorarioCmp,
  BaPdfViewer,
  BaInputFile,
  BaProfile,
  BaUserRoles
} from './components';

import { BaCardBlur } from './components/baCard/baCardBlur.directive';

import {
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaHidden,
  BaTrim
} from './directives';

import {
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  BaAutoCompletePipe,
  BaPdfViewerPipe,
  BaKeysPipe
} from './pipes';

import {
  BaImageLoaderService,
  BaMenuService,
  BaThemePreloader,
  BaThemeSpinner,
  BaAutoCompleteService
} from './services';

import {
  EmailValidator,
  EqualPasswordsValidator
} from './validators';

const NGA_COMPONENTS = [
  BaAmChart,
  BaBackTop,
  BaCard,
  BaChartistChart,
  BaCheckbox,
  BaContentTop,
  BaFullCalendar,
  BaMenuItem,
  BaMenu,
  BaMsgCenter,
  BaMultiCheckbox,
  BaPageTop,
  BaPictureUploader,
  BaSidebar,
  BaAlerta,
  BaFileUploaderCmp,
  BaHabilitarBotonCmp,
  BaConfirmDialogCmp,
  BaAutoComplete,
  BaVisualizadorHorarioCmp,
  BaPdfViewer,
  BaInputFile,
  BaProfile,
  BaUserRoles
];

const NGA_DIRECTIVES = [
  BaScrollPosition,
  BaSlimScroll,
  BaThemeRun,
  BaCardBlur,
  BaHidden,
  BaTrim
];

const NGA_PIPES = [
  BaAppPicturePipe,
  BaKameleonPicturePipe,
  BaProfilePicturePipe,
  BaAutoCompletePipe,
  BaPdfViewerPipe,
  BaKeysPipe
];

const NGA_SERVICES = [
  BaImageLoaderService,
  BaThemePreloader,
  BaThemeSpinner,
  BaMenuService,
  BaAutoCompleteService
];

const NGA_VALIDATORS = [
  EmailValidator,
  EqualPasswordsValidator
];

@NgModule({
  declarations: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgUploaderModule,
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  exports: [
    ...NGA_PIPES,
    ...NGA_DIRECTIVES,
    ...NGA_COMPONENTS
  ]
})
export class NgaModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders> {
      ngModule: NgaModule,
      providers: [
        BaThemeConfigProvider,
        BaThemeConfig,
        ...NGA_VALIDATORS,
        ...NGA_SERVICES,
        DatePipe
      ],
    };
  }
}
