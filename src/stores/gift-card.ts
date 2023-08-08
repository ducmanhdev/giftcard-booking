import { defineStore } from 'pinia';
import axios from '@/plugins/axios';

export interface CreateGiftCardRequest {
  template_id: number;
  shop_id: number;
  value: number;
  type?: number;
  status?: number;
  delivery_id: 1 | 2 | 3;
  delivery_date: string;
  message?: string;
  recipient_name: string;
  recipient_phone?: string;
  recipient_email: string;
  sender_name: string;
  sender_phone: string;
  security_code?: number;
  promotion_code?: string;
}

export const useGiftCardStore = defineStore('giftCardStore', {
  state: () => ({
    isInitLoading: false as boolean,
    initError: null as any,
    accessKey: null as any,
    listTemplate: [] as any,
    listShop: [] as any,
    shopDetail: null as any,
    tempOrderInfo: localStorage.getItem('tempOrderInfo')
      ? JSON.parse(localStorage.getItem('tempOrderInfo') as any)
      : null,
    orderInfo: localStorage.getItem('orderInfo')
      ? JSON.parse(localStorage.getItem('orderInfo') as any)
      : null,
  }),
  actions: {
    async getAccessKey() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('api/seller/site/get-access-key');
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Error');
          }
          const responseData = JSON.parse(response.data.result.data);
          this.accessKey = responseData.apiAccessKey;
          resolve(this.accessKey);
        } catch (error) {
          reject(error);
        }
      });
    },
    getListTemplate(shopId: number) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            '/internal/template/get-list-template',
            {
              params: {
                id: shopId,
              },
            },
          );
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Error');
          }
          this.listTemplate = response.data.result.data.items;
          resolve(this.listTemplate);
        } catch (error) {
          reject(error);
        }
      });
    },
    getListShop() {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('/api/seller/site/get-list-shop');
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Error');
          }
          this.listShop = response.data.result.data.items;
          resolve(this.listShop);
        } catch (error) {
          reject(error);
        }
      });
    },
    getShopDetail(shopId: number) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get('/api/seller/site/get-list-shop', {
            params: {
              id: shopId,
            },
          });
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Error');
          }
          if (!response.data.result.data.items[0]) {
            throw new Error(`Shop not found!`);
          }
          this.shopDetail = response.data.result.data.items[0];
          resolve(this.shopDetail);
        } catch (error) {
          reject(error);
        }
      });
    },
    getOrderInfo() {
      return new Promise(async (resolve, reject) => {
        try {
          this.clearOrderInfo();
          const response = await axios.get('api/seller/site/get-order-detail', {
            params: {
              order_id: this.tempOrderInfo.orderItems[0].order_id.toString(),
            },
          });
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Get order info error!');
          }
          this.orderInfo = {
            ...response.data.result.data,
            payment: {
              ...response.data.result.data.payment,
              payment_data: JSON.parse(
                response.data.result.data.payment.payment_data,
              ),
            },
          };
          localStorage.setItem('orderInfo', JSON.stringify(this.orderInfo));
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    },
    createGiftCard(data: CreateGiftCardRequest) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post(
            '/api/seller/form/create-giftcard',
            data,
          );
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Error');
          }
          this.tempOrderInfo = response.data.result.data;
          localStorage.setItem(
            'tempOrderInfo',
            JSON.stringify(this.tempOrderInfo),
          );
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    },
    checkPromotionCode(code: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get(
            '/api/seller/site/check-promotion-code',
            {
              params: {
                code: code,
              },
            },
          );
          if (!response.data || response.data.status !== 'OK') {
            throw new Error(response?.data?.message || 'Error');
          }
          resolve(response.data.result.data);
        } catch (error) {
          reject(error);
        }
      });
    },
    payment(token: string) {
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.post('/api/seller/form/submit-payment', {
            order_id: this.tempOrderInfo.orderItems[0].order_id.toString(),
            token: token,
          });
          if (!response.data || response.data.status !== 'OK') {
            throw new Error('Payment error!');
          }
          await this.getOrderInfo();
          this.clearTempOrderInfo();
          resolve(null);
        } catch (error) {
          reject(error);
        }
      });
    },
    init(shopId: number) {
      return new Promise(async (resolve, reject) => {
        try {
          this.isInitLoading = true;
          await this.getShopDetail(shopId);
          await this.getListTemplate(shopId);
        } catch (error) {
          this.initError = error;
          console.error(error);
          reject(error);
        } finally {
          this.isInitLoading = false;
        }
      });
    },
    clearOrderInfo() {
      this.orderInfo = null;
      localStorage.removeItem('orderInfo');
    },
    clearTempOrderInfo() {
      this.tempOrderInfo = null;
      localStorage.removeItem('tempOrderInfo');
    },
  },
});
