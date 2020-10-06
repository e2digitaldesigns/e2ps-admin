import { dateParser, moneyFormatParser } from '..';

export default (data) => {
  let subTotal = 0,
    shippingPrice = 0,
    amountPaid = 0;

  for (let x = 0; x < data.storeInvoiceItems.length; x++) {
    subTotal += data.storeInvoiceItems[x].item.itemPrice;
    shippingPrice += data.storeInvoiceItems[x].item.shipping.price;
    amountPaid += data.storeInvoiceItems[x].item.amountPaid;
  }

  return {
    date: dateParser(data.date, 'sm'),
    subTotal: moneyFormatParser(subTotal),
    shippingPrice: moneyFormatParser(shippingPrice),
    total: moneyFormatParser(subTotal + shippingPrice),
    amountPaid: moneyFormatParser(amountPaid),
    amountDue: moneyFormatParser(subTotal + shippingPrice - amountPaid),
  };
};
