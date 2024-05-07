import { ContainerModule } from '@theia/core/shared/inversify';
import { WidgettWidget } from './widgett-widget';
import { WidgettContribution } from './widgett-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, WidgettContribution);
    bind(FrontendApplicationContribution).toService(WidgettContribution);
    bind(WidgettWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: WidgettWidget.ID,
        createWidget: () => ctx.container.get<WidgettWidget>(WidgettWidget)
    })).inSingletonScope();
});
