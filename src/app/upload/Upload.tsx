'use client';
import React from 'react';
import ReceiptUpload from '@/components/receipt-upload';

export default function Upload() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center p-20">
        <ReceiptUpload />
      </div>
    </>
  );
}
