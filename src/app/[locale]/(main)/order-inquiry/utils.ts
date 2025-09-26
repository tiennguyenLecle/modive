// t: translations - ordering
const mapOrderStatus = (status: string, t: any) => {
  switch (status) {
    case 'confirmed':
      return t('confirmed');
    case 'pending':
      return t('pending');
    case 'paid':
      return t('paid');
    case 'shipping':
      return t('shipping');
    case 'completed':
      return t('completed');
    case 'cancelled':
      return t('cancelled');
    case 'refunded':
      return t('refunded');
    default:
      return status;
  }
};

export { mapOrderStatus };
