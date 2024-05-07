import { ContainerModule } from '@theia/core/shared/inversify';
import { TeeettWidget } from './teeett-widget';
import { TeeettContribution } from './teeett-contribution';
import { bindViewContribution, FrontendApplicationContribution, WidgetFactory } from '@theia/core/lib/browser';

import '../../src/browser/style/index.css';

export default new ContainerModule(bind => {
    bindViewContribution(bind, TeeettContribution);
    bind(FrontendApplicationContribution).toService(TeeettContribution);
    bind(TeeettWidget).toSelf();
    bind(WidgetFactory).toDynamicValue(ctx => ({
        id: TeeettWidget.ID,
        createWidget: () => ctx.container.get<TeeettWidget>(TeeettWidget)
    })).inSingletonScope();
});
