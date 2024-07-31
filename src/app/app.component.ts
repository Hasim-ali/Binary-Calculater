import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  a: string = '';
  b: string = '';
  operation: string = 'add';
  result: string = '';

  performOperation() {
    this.result = this.binaryOperations(this.a, this.b, this.operation);
  }

  binaryOperations(a: string, b: string, operation: string): string {
    let result = '',
        carry = 0,
        borrow = 0;

    switch (operation) {
      case 'add':
        while (a || b || carry) {
          let sum = +a.slice(-1) + +b.slice(-1) + carry;
          if (sum > 1) {
            result = (sum % 2) + result;
            carry = 1;
          } else {
            result = sum + result;
            carry = 0;
          }
          a = a.slice(0, -1);
          b = b.slice(0, -1);
        }
        break;

      case 'subtract':
        let n = Math.max(a.length, b.length);
        a = a.padStart(n, '0');
        b = b.padStart(n, '0');
        for (let i = n - 1; i >= 0; i--) {
          let diff = +a[i] - +b[i] - borrow;
          if (diff < 0) {
            diff += 2;
            borrow = 1;
          } else {
            borrow = 0;
          }
          result = diff + result;
        }
        result = result.replace(/^0+/, '') || '0';
        break;

      case 'divide':
        let dividend = parseInt(a, 2);
        let divisor = parseInt(b, 2);
        if (divisor === 0) {
          throw new Error("Division by zero");
        }
        let quotient = Math.floor(dividend / divisor);
        result = quotient.toString(2);
        break;

      case 'modulo':
        dividend = parseInt(a, 2);
        divisor = parseInt(b, 2);
        if (divisor === 0) {
          throw new Error("Modulo by zero");
        }
        let remainder = dividend % divisor;
        result = remainder.toString(2);
        break;

      default:
        throw new Error("Invalid operation");
    }

    return result;
  }
  numberNdecimalOnly(event: any): boolean {
    var charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 48 && charCode != 49) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
