export interface QueryObj {
  sort?: string;
  fields?: string;
  limit?: string;
  page?: string;
}

export interface TransactionProcessedCallbackData {
  type: string;
  obj: {
    id: number;
    pending: boolean;
    amount_cents: number;
    success: boolean;
    is_auth: boolean;
    is_capture: boolean;
    is_standalone_payment: boolean;
    is_voided: boolean;
    is_refunded: boolean;
    is_3d_secure: boolean;
    integration_id: number;
    profile_id: number;
    has_parent_transaction: boolean;
    order: {
      id: number;
      created_at: string;
      delivery_needed: boolean;
      merchant: Object;
      collector: null;
      amount_cents: number;
      shipping_data: Object;
      currency: string;
      is_payment_locked: boolean;
      is_return: boolean;
      is_cancel: boolean;
      is_returned: boolean;
      is_canceled: boolean;
      merchant_order_id: null;
      wallet_notification: null;
      paid_amount_cents: number;
      notify_user_with_email: boolean;
      items: Object;
      order_url: string;
      commission_fees: number;
      delivery_fees_cents: number;
      delivery_vat_cents: number;
      payment_method: string;
      merchant_staff_tag: any;
      api_source: string;
      data: any;
    };
    created_at: string;
    transaction_processed_callback_responses: any;
    currency: string;
    source_data: { type: string; pan: string; sub_type: string; tenure: any };
    api_source: string;
    terminal_id: any;
    merchant_commission: number;
    installment: any;
    is_void: boolean;
    is_refund: boolean;
    data: {
      gateway_integration_pk: number;
      klass: string;
      created_at: string;
      amount: number;
      currency: string;
      migs_order: any;
      merchant: string;
      migs_result: string;
      migs_transaction: any;
      txn_response_code: string;
      acq_response_code: string;
      message: string;
      merchant_txn_ref: string;
      order_info: string;
      receipt_no: string;
      transaction_no: string;
    };
    is_hidden: boolean;
    payment_key_claims: {
      user_id: number;
      amount_cents: number;
      currency: string;
      integration_id: number;
      order_id: number;
      billing_data: any;
      lock_order_when_paid: boolean;
      exp: number;
      pmk_ip: string;
    };
  };
}
