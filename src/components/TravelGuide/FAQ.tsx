"use client";
import { useState } from 'react';

const faqs = [
    {
        question: 'Thị thực',
        answer: 'Ngày 15/3/2022, Chính phủ ban hành Nghị quyết số 32/NQ-CP về việc miễn thị thực cho công dân các nước: Đức, Pháp, Ý, Tây Ban Nha, Anh, Nga, Nhật, Hàn Quốc, Đan Mạch, Thụy Điển, Na-uy, Phần Lan, Belarus.'
    },
    { question: 'Di chuyển', answer: 'Thông tin về phương tiện di chuyển trong thành phố và từ sân bay.' },
    { question: 'Thẻ Sim & Số điện thoại cần biết', answer: 'Hướng dẫn mua sim, các số điện thoại khẩn cấp, hỗ trợ.' },
    { question: 'Ổ cắm điện', answer: 'Thông tin về loại ổ cắm, điện áp sử dụng tại Việt Nam.' },
    { question: 'Internet & Bưu chính', answer: 'Hướng dẫn sử dụng internet, wifi, dịch vụ bưu chính.' },
    { question: 'Tiền tệ', answer: 'Thông tin về tiền tệ, đổi tiền, sử dụng thẻ tại TP.HCM.' },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-primary">Câu hỏi thường gặp</h2>
            <div className="space-y-4">
                {faqs.map((faq, idx) => (
                    <div key={idx} className="border rounded-lg p-4 bg-white shadow">
                        <button className="w-full text-left font-semibold text-lg flex justify-between items-center" onClick={() => setOpen(open === idx ? null : idx)}>
                            {faq.question}
                            <span>{open === idx ? '-' : '+'}</span>
                        </button>
                        {open === idx && <div className="mt-2 text-muted-foreground">{faq.answer}</div>}
                    </div>
                ))}
            </div>
        </section>
    );
} 
