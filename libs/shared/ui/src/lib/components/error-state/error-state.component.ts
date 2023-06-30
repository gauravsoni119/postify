import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'postify-error-state',
  templateUrl: './error-state.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorStateComponent {
  @Input() title = '';
  @Input() message = '';
}
