const { Joi } = require('express-validation');

const loginValidation = {
  body: Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: false },
    }),
    password: Joi.string(),
  }),
};

const registrationValidation = {
  body: Joi.object({
    name: Joi.required(),
    email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: false } }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  }),
};

const editUserPricingValidation = Joi.object().keys({
  user_id: Joi.number().required(),
  productable_id: Joi.number().required(),
  productable_type: Joi.string().required(),
  price: Joi.number().required(),
});

const userwisePricingValidation = Joi.object().keys({
  productable_id: Joi.number().required(),
  productable_type: Joi.string().required(),
  price: Joi.number().required(),
});

const createUserValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
      .lowercase()
      .email({ minDomainSegments: 2, tlds: { allow: false } }),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    additional_contacts: Joi.string().allow('', null),
    // .pattern(/^\[0-9]+(,\[0-9]+)*$/),
    additional_emails: Joi.string().allow('', null),
    // .pattern(
    //   /^([\w+-.%]+@[\w-.]+\.[A-Za-z]{2,4},?)+$/
    // ),
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    landmark: Joi.string(),
    pincode_id: Joi.number().required(),
    payment: Joi.number().required(),
    gst_number: Joi.string().pattern(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    ),
    userwise_pricing: Joi.boolean().required(),
    userwise_pricings: Joi.alternatives().conditional('userwise_pricing', {
      is: true,
      then: Joi.array().items(userwisePricingValidation),
    }),
  }),
};

const patientValidation = {
  body: Joi.object({
    name: Joi.required(),
    mobile: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .optional(),
    address_line_1: Joi.string().allow(''),
    address_line_2: Joi.string().allow(''),
    landmark: Joi.string().allow(''),
    pincode_id: Joi.number().allow(null),
    attachment: Joi.string(),
    patient_uuid: Joi.string(),
    is_clinic_address: Joi.boolean(),
  }),
};

const patientEditValidation = {
  body: Joi.object({
    name: Joi.required(),
    mobile: Joi.string()
      .optional()
      .length(10)
      .pattern(/^[0-9]+$/)
      .allow(null, ''),
    attachment: Joi.string(),
    patient_uuid: Joi.string(),
    is_clinic_address: Joi.boolean(),
  }),
};

const addressValidation = {
  body: Joi.object({
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    landmark: Joi.string(),
    pincode_id: Joi.number().required(),
    addressable_id: Joi.number().required(),
    addressable_type: Joi.string().required(),
  }),
};

const addressValidations = {
  body: Joi.object({
    address_line_1: Joi.string(),
    address_line_2: Joi.string(),
    landmark: Joi.string(),
    pincode_id: Joi.number().required(),
  }),
};

const addressTypeValidation = {
  params: Joi.object({
    id: Joi.number(),
    addressable_type: Joi.string(),
  }),
};

const updateAddressValidation = {
  params: Joi.object({
    id: Joi.number().required(),
    add_id: Joi.number().required(),
  }),
};

const updateAddressBodyValidation = {
  body: Joi.object({
    address_type: Joi.boolean().required(),
  }),
};

const productValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    amount: Joi.number().required(),
  }),
};

const subproductValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    product_id: Joi.number().required(),
  }),
};

const brandOrderDetailsValidation = Joi.object().keys({
  min: Joi.number().required(),
  max: Joi.number().required(),
  prefix: Joi.string().required(),
  brand_id: Joi.number().required(),
  aligner_type_id: Joi.number().required(),
  // foil_thickness: Joi.number(),
});

const modelOrderDetailsValidation = Joi.object().keys({
  min: Joi.number().required(),
  max: Joi.number().required(),
  prefix: Joi.string().required(),
  model_type_id: Joi.number().required(),
});

const orderValidation = {
  body: Joi.object({
    product_id: Joi.number().required(),
    quantity: Joi.number().required(),
    amount: Joi.number().required(),
    shipping_cost: Joi.number().required(),
    tax: Joi.number().required(),
    total_amount: Joi.number().required(),
    customer_id: Joi.number().required(),
    patient_id: Joi.number().required(),
    instructions: Joi.string(),
    stl_attachment: Joi.string(),
    file_attachment: Joi.string(),
    razorpay_order_id: Joi.string(),
    add_ons: Joi.array().items(Joi.number()),
    ship_to_clinic: Joi.boolean(),
    address_id: Joi.alternatives().conditional('ship_to_clinic', {
      is: false,
      then: Joi.number().required(),
      otherwise: Joi.allow(null),
    }),
    order_details: Joi.alternatives().conditional('product_id', {
      is: 1,
      then: Joi.array().items(modelOrderDetailsValidation),
      otherwise: Joi.array().items(brandOrderDetailsValidation),
    }),
    trim_id: Joi.alternatives().conditional('product_id', {
      is: 2,
      then: Joi.number().required(),
    }),
    drive_link: Joi.string().allow(null, ''),
  }),
};

const editBrandOrderDetailsValidation = Joi.object().keys({
  id: Joi.number().optional(),
  min: Joi.number().required(),
  max: Joi.number().required(),
  prefix: Joi.string().required(),
  brand_id: Joi.number().required(),
  aligner_type_id: Joi.number().required(),
  brand: Joi.object().optional(),
  aligner_type: Joi.object().optional(),
  model_type: Joi.string().optional().allow(null),
  model_type_id: Joi.number().optional().allow(null),
});

const editModelOrderDetailsValidation = Joi.object().keys({
  id: Joi.number().optional(),
  min: Joi.number().required(),
  max: Joi.number().required(),
  prefix: Joi.string().required(),
  model_type_id: Joi.number().required(),
  brand_id: Joi.number().optional().allow(null),
  brand: Joi.string().optional().allow(null),
  aligner_type_id: Joi.number().optional().allow(null),
  aligner_type: Joi.string().optional().allow(null),
  model_type: Joi.object().optional(),
});

const editOrderValidationForAdmin = {
  body: Joi.object({
    product_id: Joi.number().required(),
    user_id: Joi.number().required(),
    order_details: Joi.alternatives().conditional('product_id', {
      is: 1,
      then: Joi.array().items(editModelOrderDetailsValidation),
      otherwise: Joi.array().items(editBrandOrderDetailsValidation),
    }),
    add_ons: Joi.array().items(Joi.number()),
  }),
};

const namePriceValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

const nameValidation = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

const idValidation = {
  params: Joi.object({
    id: Joi.number().required(),
  }),
};

const pincodeValidation = {
  query: Joi.object({
    pincode: Joi.string().required(),
  }),
};

const pageSizeValidation = {
  query: Joi.object({
    size: Joi.number(),
    page: Joi.number(),
    term: Joi.string().optional().allow(''),
    filter: Joi.string().optional().allow(''),
  }),
};

const priceValidation = {
  body: Joi.object({
    type: Joi.string().required(),
    price: Joi.number().required(),
  }),
};

const updateTaxValidation = Joi.object().keys({
  type: Joi.string().required(),
  price: Joi.string().required(),
});

const pricingValidation = {
  body: Joi.array().items(updateTaxValidation),
};

const changePasswordValidation = {
  body: Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
    new_password_confirmation: Joi.string().required(),
  }),
};

const mediaValidation = {
  body: Joi.object({
    type: Joi.string().required(),
    file_name: Joi.string().required(),
    patient_uuid: Joi.string(),
    order_id: Joi.number(),
  }),
};

const yearValidation = {
  params: Joi.object({
    year: Joi.number().required(),
  }),
};

const typeValidation = {
  query: Joi.object({
    type: Joi.string().required(),
  }),
};

const termValidation = {
  query: Joi.object({
    term: Joi.string().optional().allow(''),
  }),
};

const subAdminValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    mobile: Joi.string().required(),
    password_confirmation: Joi.string().required(),
  }),
};

const updateSubAdminValidation = {
  body: Joi.object({
    name: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required(),
    update_with_password: Joi.boolean().required(),
    password: Joi.alternatives().conditional('update_with_password', {
      is: true,
      then: Joi.string().required(),
      otherwise: Joi.allow(null),
    }),
    password_confirmation: Joi.alternatives().conditional(
      'update_with_password',
      {
        is: true,
        then: Joi.string().required(),
        otherwise: Joi.allow(null),
      },
    ),
  }),
};

const trackingInfoQueryValidation = {
  params: Joi.object({
    order_id: Joi.number().required(),
  }),
};

const trackingInfoBodyValidation = {
  body: Joi.object({
    tracking_info: Joi.allow(null),
  }),
};

const userIdValidation = {
  query: Joi.object({
    user_id: Joi.number().required(),
  }),
};

const cancelOrderValidation = {
  body: Joi.object({
    reason: Joi.string().optional(),
  }),
};

module.exports = {
  loginValidation,
  registrationValidation,
  addressValidation,
  productValidation,
  orderValidation,
  patientValidation,
  createUserValidation,
  pincodeValidation,
  pageSizeValidation,
  editUserPricingValidation,
  addressValidations,
  updateAddressValidation,
  priceValidation,
  changePasswordValidation,
  mediaValidation,
  addressTypeValidation,
  yearValidation,
  pricingValidation,
  termValidation,
  idValidation,
  typeValidation,
  nameValidation,
  namePriceValidation,
  subproductValidation,
  patientEditValidation,
  updateAddressBodyValidation,
  subAdminValidation,
  updateSubAdminValidation,
  trackingInfoQueryValidation,
  trackingInfoBodyValidation,
  userIdValidation,
  editOrderValidationForAdmin,
  cancelOrderValidation,
};
