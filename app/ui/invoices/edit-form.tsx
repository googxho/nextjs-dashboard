'use client';

import { CustomerField, InvoiceForm } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm;
  customers: CustomerField[];
}) {
  /*
  Next.js 到底“自动”做了什么？

  1️⃣ 浏览器做的事情（标准 HTML 行为）
  <form action="...">
  当你点击提交按钮时：
  浏览器收集所有带 name 的表单字段
  生成一个 HTTP POST 请求
  请求体里是 表单数据
  这一步 与 React / Next.js 无关，是 HTML 标准行为。

  2️⃣ Next.js 拦截了这个 POST 请求
  因为你写的是：<form action={someServerAction}>
  而不是一个 URL，Next.js 知道：
  “这是一个 Server Action 表单提交，不是普通页面跳转。”
  于是 Next.js：
  不把请求发到某个路由
  而是把请求 映射到这个 Server Action 函数

  3️⃣ Next.js 调用你的 Server Action（关键点）
  在服务器上，Next.js 实际上做的是类似下面的事情（伪代码）：
  const formData = extractFormDataFromRequest(request);
  // 调用你的函数
  someServerAction(formData);
  ⚠️ 注意：
  这一步 不是你写的代码，是 Next.js 框架代码。
  这就是为什么说：
  FormData 是“自动”传入的

  什么 FormData 一定是“最后一个参数”？
  因为 Next.js 在调用 Server Action 时，它只知道一件事：
  “这是一个表单提交，我只能提供表单数据。”
  它不知道你提前用 bind 绑定了多少参数，于是采用一个固定规则：
  始终把 FormData 作为最后一个参数传入。
  所以 Server Action 的函数签名必须是：
  (actionBoundArgs..., formData: FormData)

  用一句话总结“为什么可以自动”
  因为 Server Action 并不是你自己调用的函数，
  而是 Next.js 在服务器端接管了表单提交，并按照固定规则调用它。
*/
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  return (
    <form action={updateInvoiceWithId as any}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={invoice.customer_id}
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.amount}
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  defaultChecked={invoice.status === 'pending'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  defaultChecked={invoice.status === 'paid'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
