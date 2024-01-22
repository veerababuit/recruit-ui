import html2pdf from 'html2pdf.js';
import 'jspdf-autotable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import React, { useRef } from 'react';
import raveslogo from '../../../assets/images/RAVES.png';


const dataTableData = [
    {
        earning: 'Basic Pay',
        hours: '35',
        rate: '$50.00',
        currentPay: '$1750.00',
        YTDPay: '$57,500.00',
        // subTotal:"5000"
    },
    {
        earning: 'HRA',
        hours: '5',
        rate: '$50.00',
        currentPay: '$250.00',
        YTDPay: '$5000.00',
    },
    {
        earning: 'Medical Allowance',
        hours: '--',
        rate: '--',
        currentPay: '--',
        YTDPay: '--',
    },
    {
        earning: 'Conveyance Allowance',
        hours: '1',
        rate: '--',
        currentPay: '--',
        YTDPay: '--',
    },
    {
        earning: 'Special Allowance',
        hours: '1',
        rate: '$50.00',
        currentPay: '$50.00',
        YTDPay: '$500.00',
    },
    {
        earning: 'Additional Allowance(s)',
        hours: '--',
        rate: '--',
        currentPay: '--',
        YTDPay: '--',
    },
    {
        earning: 'Commision or Incetive',
        hours: '--',
        rate: '--',
        currentPay: '--',
        YTDPay: '--',
    },
    {
        earning: 'Bonus or gift Voucher',
        hours: '2',
        rate: '$50.00',
        currentPay: '$100.00',
        YTDPay: '$1000.00',
    },
    {
        earning: 'SubTotal',
        hours: '44',
        rate: '$200.00',
        currentPay: '$2150.00',
        YTDPay: '$64000.00',
    },
];

const dataTableData1 = [
    {
        deduction: 'Federal with holding',
        current: '$20.00',
        YTD: '240',
    },
    {
        deduction: 'Federal MED-EE',
        current: '$15.00',
        YTD: '180',
    },
    {
        deduction: 'Federal OSAD/EE',
        current: '$5.00',
        YTD: '60',
    },
    {
        deduction: 'State with holding',
        current: '$20.00',
        YTD: '240',
    },
    {
        deduction: 'Other',
        current: '$20.00',
        YTD: '240',
    },
    {
        deduction: 'Subtoal',
        current: '$80.00',
        YTD: '$960.00',
    },
];

function PayrollPaySleep({ rowData, handleScroll }) {
    const toast = useRef(null);
    const toastOptions = {
        // life: 3000,
        sticky: true,
        severity: 'success',
        summary: 'Invoice Sent',
        detail: 'Invoice has been sent successfully!',
    };

    const handlePrint = () => {
        const printContent = document.querySelector('.container');
        const buttonsContainer = document.querySelector('.print-download-sendinvoice');

        buttonsContainer.style.visibility = 'hidden';

        const printWindow = window.open('', '_blank');

        const styles = Array.from(document.styleSheets)
            .map((styleSheet) => {
                try {
                    return Array.from(styleSheet.cssRules)
                        .map((rule) => rule.cssText)
                        .join('\n');
                } catch (e) {
                    console.log('Error:', e);
                    return '';
                }
            })
            .join('\n');

        printWindow.document.write(`
        <html>
            <head>
                <style>${styles}</style>
            </head>
            <body class="ps-4 pe-4">
                <div class="print-content">
                    ${printContent.innerHTML}
                </div>
            </body>
        </html>
    `);

        printWindow.document.close();
        const elements = printWindow.document.querySelectorAll('*');
        elements.forEach((el) => {
            el.style.pageBreakInside = 'avoid';
        });

        printWindow.onload = () => {
            printWindow.print();
            buttonsContainer.style.visibility = 'visible';
        };
    };

    const handleDownloadPDF = () => {
        const element = document.querySelector('.container');
        const buttonsContainer = document.querySelector('.print-download-sendinvoice');

        buttonsContainer.style.visibility = 'hidden';

        const elements = element.querySelectorAll('*');
        elements.forEach((el) => {
            el.style.pageBreakInside = 'avoid';
        });

        const invoiceNumber = 'LRIN-004567';
        const fileName = `invoice_${invoiceNumber}.pdf`;

        html2pdf()
            .from(element)
            .toPdf()
            .get('pdf')
            .then((pdf) => {
                pdf.save(fileName);

                elements.forEach((el) => {
                    el.style.pageBreakInside = '';
                });

                buttonsContainer.style.visibility = 'visible';
            });
    };

    const handleSendInvoice = () => {
        if (toast.current) {
            toast.current.show(toastOptions);
        }
        console.log('Invoice Sent Successfully');
    };

    return (
        <>
            <div className="fixed right-0 w-75 viewer-with-footer-body overflow-y-auto px-2 " onScroll={handleScroll}>
                <div className="container">
                    <div className="row mb-2">
                        <div className="col-12 text-center">
                            <img src={raveslogo} className="cursor-pointer" alt="Company Logo" />
                        </div>
                    </div>

                    {/* Invoice Header */}
                    <div className="row mb-2">
                        <div className="col-8">
                            <h4>Near Shore Resource</h4>
                            <h6>Pragati Plaza,Plot No. 741,</h6>
                            <h6>Road Number 39, Ayappa Society</h6>
                            <h6>Madhapur, Hyd-500081</h6>
                        </div>
                        <div className="col-4">
                            <h4>Paysleep #303941</h4>
                            <h6>
                                {' '}
                                <span>Pay Date : </span> <span>May 01, 2023</span>
                            </h6>
                            <h6>
                                {' '}
                                <span>Payroll Check Number </span>: 1881
                            </h6>
                            <h6>
                                {' '}
                                <span>Pay Period </span>: 01/04/2023 - 30/04/2023
                            </h6>
                            <div className='fs-6 fw-bold mt-3 text-center'>Abhsihek Pulluri</div>
                        </div>
                    </div>
                    {/* Data Table */}
                    <div className="row">
                        <div className="col-12">
                            <DataTable value={dataTableData}>
                                {/* {dataTableColumns.map((column) => (
                                    <Column key={column.field} field={column.field} header={column.header} />
                                ))} */}
                                <Column field='earning' header= 'Earnings' style={{ fontWeight: 'bold' }}/>
                                <Column field='hours' header= 'Hours'/>
                                <Column field='rate' header= 'Rate'/>
                                <Column field='currentPay' header= 'Current Pay'/>
                                <Column field='YTDPay' header= 'YTD Pay'/>
                            </DataTable>
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col-12">
                            <DataTable value={dataTableData1}>
                                {/* {dataTableColumns.map((column) => (
                                    <Column key={column.field} field={column.field} header={column.header} />
                                ))} */}
                                <Column field='deduction' header= 'Deduction' style={{ fontWeight: 'bold' }}/>
                                <Column field='current' header= 'Current' style={{ width:"25%" }}/>
                                <Column field='YTD' header= 'YTD' style={{ width:"100px" }}/>
                            </DataTable>
                        </div>
                    </div>

                    {/* Grand Total */}
                    {/* <div className="col-12 mb-2">
                        <div className="d-flex justify-content-end gap-5 align-items-center pb-2">
                            <div>
                                <span>Sub Total:</span>
                            </div>
                            <div>
                                <span>$1000</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-5 align-items-center">
                            <div>
                                <span className="me-2">Estimated Tax (10%):</span>
                            </div>
                            <div>
                                <span>$1000</span>
                            </div>
                        </div>
                        <div className="d-flex justify-content-end gap-5 align-items-center">
                            <div>
                                <span className="me-2">Discount (10%):</span>
                            </div>
                            <div>
                                <span>$100</span>
                            </div>
                        </div>
                        <div className="d-flex fw-bold justify-content-end gap-4 align-items-center mt-3 pt-2 pb-2 border-top-1 border-secondary border-opacity-25 border-bottom-3">
                            <div>
                                <span className="me-1">Grand Total:</span>
                            </div>
                            <div>
                                <span>$1000</span>
                            </div>
                        </div>
                    </div> */}

                    {/* Payment Details */}
                    <div className="row mt-3">
                       <div className='d-flex justify-content-between'>
                       <div className="">
                            <h6>Lucid Technologies Inc</h6>
                            <h6>Pragati Plaza, Plot Number 741,</h6>
                            <h6>Road No. 39, Ayyapa Society,</h6>
                            <h6>Madhapur HYD - 500081</h6>
                        </div>
                        <div className="">
                            <h6>Pay Check No. : 1223</h6>
                            <h6>Pay Date: 11/01/2024</h6>
                        </div>
                       </div>
                    </div>
                    <div className="row">
                        <div className="col-12 mb-6">
                            <p className="text-justify invoice-note-bg rounded-1 p-3">
                                <b>NOTES: </b> All accounts are to be paid within 7 days from receipt of invoice. To be
                                paid by cheque or credit card or direct payment online. If account is not paid within 7
                                days the credits details supplied as confirmation of work undertaken will be charged the
                                agreed quoted fee noted above.
                            </p>
                        </div>
                    </div>

                    {/* Print, Download and Send Invoice */}
                    <div className="print-download-sendinvoice fixed bottom-0 h-custom-10 p-sidebar-header col-12 d-flex justify-content-end fixed bottom-0 right-0 w-75 footer-bg p-3 gap-3">
                        <Button
                            type="button"
                            severity="secondary"
                            icon="pi pi-print"
                            label="Print"
                            size="small"
                            className=""
                            onClick={handlePrint}
                        />
                        <Button
                            type="button"
                            severity="secondary"
                            icon="pi pi-arrow-down"
                            label="Download"
                            size="small"
                            className=""
                            onClick={handleDownloadPDF}
                        />
                        <Button
                            type="button"
                            severity="primary"
                            icon=""
                            label="Send Invoice"
                            size="small"
                            className="me-2"
                            onClick={handleSendInvoice}
                        />
                    </div>
                    <Toast ref={toast} />
                </div>
            </div>
        </>
    );
}

export default PayrollPaySleep;
