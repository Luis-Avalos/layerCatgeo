import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendResetCode = async (to, code) => {
  const mailOptions = {
    from: '"Geomatica | Catalogo" <g.maps@zapopan.gob.mx>',
    to,
    subject: "Código de recuperación de contraseña",
    html: `
     <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="telephone=no" name="format-detection">
    <title>Copia de (1) New Message</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]--><!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
    <style type="text/css">
        .rollover:hover .rollover-first {
            max-height: 0px !important;
            display: none !important;
        }

        .rollover:hover .rollover-second {
            max-height: none !important;
            display: block !important;
        }

        .rollover span {
            font-size: 0px;
        }

        u+.body img~div div {
            display: none;
        }

        #outlook a {
            padding: 0;
        }

        span.MsoHyperlink,
        span.MsoHyperlinkFollowed {
            color: inherit;
            mso-style-priority: 99;
        }

        a.r {
            mso-style-priority: 100 !important;
            text-decoration: none !important;
        }

        a[x-apple-data-detectors],
        #MessageViewBody a {
            color: inherit !important;
            text-decoration: none !important;
            font-size: inherit !important;
            font-family: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }

        .h {
            display: none;
            float: left;
            overflow: hidden;
            width: 0;
            max-height: 0;
            line-height: 0;
            mso-hide: all;
        }

        @media only screen and (max-width:600px) {
            .bh {
                padding-right: 0px !important
            }

            .bg {
                padding-left: 0px !important
            }

            *[class="gmail-fix"] {
                display: none !important
            }

            p,
            a {
                line-height: 150% !important
            }

            h1,
            h1 a {
                line-height: 120% !important
            }

            h2,
            h2 a {
                line-height: 120% !important
            }

            h3,
            h3 a {
                line-height: 120% !important
            }

            h4,
            h4 a {
                line-height: 120% !important
            }

            h5,
            h5 a {
                line-height: 120% !important
            }

            h6,
            h6 a {
                line-height: 120% !important
            }

            .bd p {}

            .bc p {}

            .bb p {}

            h1 {
                font-size: 36px !important;
                text-align: left
            }

            h2 {
                font-size: 26px !important;
                text-align: left
            }

            h3 {
                font-size: 20px !important;
                text-align: left
            }

            h4 {
                font-size: 24px !important;
                text-align: left
            }

            h5 {
                font-size: 20px !important;
                text-align: left
            }

            h6 {
                font-size: 16px !important;
                text-align: left
            }

            .be h6 a,
            .bd h6 a,
            .bc h6 a {
                font-size: 16px !important
            }

            .bd p,
            .bd a {
                font-size: 16px !important
            }

            .bc p,
            .bc a {
                font-size: 14px !important
            }

            .bb p,
            .bb a {
                font-size: 12px !important
            }

            .x .rollover:hover .rollover-second,
            .y .rollover:hover .rollover-second,
            .z .rollover:hover .rollover-second {
                display: inline !important
            }

            .w {
                display: inline-table
            }

            .q,
            .q .r,
            .s,
            .s td,
            .f {
                display: inline-block !important
            }

            .k table,
            .l table,
            .m table,
            .k,
            .m,
            .l {
                width: 100% !important;
                max-width: 600px !important
            }

            .adapt-img {
                width: 100% !important;
                height: auto !important
            }

            table.e,
            .esd-block-html table {
                width: auto !important
            }

            .h-auto {
                height: auto !important
            }
        }

        @media screen and (max-width:384px) {
            .mail-message-content {
                width: 414px !important
            }
        }
    </style>
</head>

<body class="body"
    style="width:100%;height:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
    <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
        <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none"
            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
            <tr>
                <td valign="top" style="padding:0;Margin:0">
                    <table cellpadding="0" cellspacing="0" align="center" class="k" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                        <tr>
                            <td align="center" class="es-info-area" style="padding:0;Margin:0">
                                <table align="center" cellpadding="0" cellspacing="0" bgcolor="#00000000" class="bd"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                                    role="none">
                                    <tr>
                                        <td align="left" style="padding:20px;Margin:0">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center" class="bb"
                                                                    style="padding:0;Margin:0">
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px">
                                                                        <a target="_blank" href=""
                                                                            style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View
                                                                            online version</a></p>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" align="center" class="l" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="be"
                                    role="none"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px">
                                    <tr>
                                        <td align="left" bgcolor="#ffffff"
                                            style="Margin:0;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px;background-color:#ffffff">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td valign="top" align="center" class="bh"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-bottom:20px;font-size:0px">
                                                                    <img src="https://s3.zapopan.gob.mx/geomatica/vmprofile/camioncito.png"
                                                                        alt="" width="560" title="Logo"
                                                                        class="adapt-img"
                                                                        style="display:block;font-size:12px;border:0;outline:none;text-decoration:none">
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" align="center" class="k" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important">
                        <tr class="es-visible-simple-html-only">
                            <td align="center" class="es-stripe-html" style="padding:0;Margin:0">
                                <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="bd"
                                    role="none"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                                    <tr>
                                        <td align="left" bgcolor="#ffffff"
                                            style="padding:0;Margin:0;background-color:#ffffff">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px"
                                                            role="presentation">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-bottom:10px;font-size:0">
                                                                    <img src="https://fpdtjni.stripocdn.email/content/guids/CABINET_5d9543e827a065c12d9b79a3da06bbaa662dffae34e3fbee6681ded4674e15b8/images/imagecc.png"
                                                                        alt="" width="190"
                                                                        style="display:block;font-size:14px;border:0;outline:none;text-decoration:none">
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="left"
                                            style="padding:0;Margin:0;padding-right:20px;padding-left:20px;padding-bottom:30px">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="center" valign="top"
                                                        style="padding:0;Margin:0;width:560px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:5px"
                                                            role="presentation">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:20px;Margin:0;font-size:0">
                                                                    <table border="0" width="100%" height="100%"
                                                                        cellpadding="0" cellspacing="0" class="w"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td
                                                                                style="padding:0;Margin:0;height:0px;width:100%;margin:0px;border-bottom:1px solid #cccccc;background:none">
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" class="bh bg c"
                                                                    style="Margin:0;padding-top:5px;padding-right:40px;padding-bottom:5px;padding-left:40px">
                                                                    <h4
                                                                        style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:28.8px;color:#333333; text-align: center;">
                                                                        <strong>Su código único es</strong></h4>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" style="padding:0;Margin:0">
                                                                    <div
                                                                        style="margin:0; display:flex;">
                                                                        <div
                                                                            style="margin:0 auto;">
                                                                            <div
                                                                                style="font-weight:bold;border:2px solid;border-radius:5px;box-shadow:0 4px 10px #0000001A;background-color:#ffffff;padding:20px;font-size:24px">
                                                                                <h4
                                                                                    style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:28.8px;color:#333333">
                                                                                    <strong>${code}</strong></h4>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td
                                                                    style="padding:0;Margin:0;padding-top:30px;padding-right:25px;padding-left:25px;text-align:center;">
                                                                    <h6
                                                                        style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#333333;text-align:center;">
                                                                        Por favor, verifica tu identidad ingresando este código de 6 dígitos en la siguiente página:</h6>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <h4
                                                                        style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#333333; text-align:center;">
                                                                        <strong>Nota importante</strong></h4>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <strong></strong>Este código caducará en
                                                                        <strong>10 minutos</strong> por razones de
                                                                        seguridad.</p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        Si no solicitaste este servicio, por favor,
                                                                        ignora este correo.</p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        Si necesitas ayuda adicional, no dudes en
                                                                        contactarnos.</p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        Saludos cordiales,</p>
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">
                                                                        <br></p>
                                                                    <h6
                                                                        style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#333333;text-align:center;">
                                                                        <u>Unidad de Geomática</u></h6>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" align="center" class="m" role="none"
                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
                        <tr>
                            <td align="center" style="padding:0;Margin:0">
                                <table align="center" cellpadding="0" cellspacing="0" class="bc"
                                    style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px"
                                    role="none">
                                    <tr>
                                        <td align="left" bgcolor="#ffffff"
                                            style="Margin:0;padding-right:20px;padding-left:20px;padding-bottom:20px;padding-top:20px;background-color:#ffffff">
                                            <table cellpadding="0" cellspacing="0" width="100%" role="none"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                <tr>
                                                    <td align="left" style="padding:0;Margin:0;width:600px">
                                                        <table cellpadding="0" cellspacing="0" width="100%"
                                                            role="presentation"
                                                            style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                            <tr>
                                                                <td align="center"
                                                                    style="padding:0;Margin:0;padding-top:15px;padding-bottom:15px;font-size:0">
                                                                    <table cellpadding="0" cellspacing="0" class="e s"
                                                                        role="presentation"
                                                                        style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                        <tr>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:40px">
                                                                                <a target="_blank"
                                                                                    href="https://www.facebook.com/ZapopanGob/"
                                                                                    style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img
                                                                                        title="Facebook"
                                                                                        src="https://fpdtjni.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png"
                                                                                        alt="Fb" width="36" height="36"
                                                                                        style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:40px">
                                                                                <a target="_blank"
                                                                                    href="https://x.com/ZapopanGob"
                                                                                    style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img
                                                                                        title="X"
                                                                                        src="https://fpdtjni.stripocdn.email/content/assets/img/social-icons/logo-black/x-logo-black.png"
                                                                                        alt="X" width="36" height="36"
                                                                                        style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0;padding-right:40px">
                                                                                <a target="_blank"
                                                                                    href="https://x.com/ZapopanGob"
                                                                                    style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img
                                                                                        title="Instagram"
                                                                                        src="https://fpdtjni.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png"
                                                                                        alt="Inst" width="36"
                                                                                        height="36"
                                                                                        style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                            </td>
                                                                            <td align="center" valign="top"
                                                                                style="padding:0;Margin:0"><a
                                                                                    target="_blank"
                                                                                    href="https://www.youtube.com/zapopangob"
                                                                                    style="mso-line-height-rule:exactly;text-decoration:underline;color:#333333;font-size:12px"><img
                                                                                        title="Youtube"
                                                                                        src="https://fpdtjni.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png"
                                                                                        alt="Yt" width="36" height="36"
                                                                                        style="display:block;font-size:14px;border:0;outline:none;text-decoration:none"></a>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="center" class="a"
                                                                    style="padding:0;Margin:0;padding-bottom:35px">
                                                                    <p
                                                                        style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px">
                                                                        <br></p>
                                                                    <h6
                                                                        style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#333333">
                                                                        Municipio de Zapopan, Jalisco <br>Prolongación
                                                                        Avenida Laureles 300, <br>Colonia Tepeyac C.P.
                                                                        45150, <br>Zapopan, Jalisco. México <br>33 3818
                                                                        2200</h6>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>

                </td>
            </tr>
        </table>
    </div>
</body>

</html>


    `,
    };
 await transporter.sendMail(mailOptions);
};

export const sendRegistroCiudadanoEmail = async ({
  email,
  nombre,
  apellido,
  fotoUrl,
}) => {
  if (!email) {
    throw new Error("Email del destinatario no definido");
  }

  const mailOptions = {
     from: `"Geomática | Catálogo" <${process.env.MAIL_USER}>`,
    to: email,
     subject: "Registro exitoso - Plataforma Catálogo",
    html: `   
   <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="es">
 <head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta content="telephone=no" name="format-detection">
  <title>Copia de (1) New Message</title><!--[if (mso 16)]>
    <style type="text/css">
    a {text-decoration: none;}
    </style>
    <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
<noscript>
         <xml>
           <o:OfficeDocumentSettings>
           <o:AllowPNG></o:AllowPNG>
           <o:PixelsPerInch>96</o:PixelsPerInch>
           </o:OfficeDocumentSettings>
         </xml>
      </noscript>
<![endif]--><!--[if mso]><xml>
    <w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word">
      <w:DontUseAdvancedTypographyReadingMail/>
    </w:WordDocument>
    </xml><![endif]-->
  <style type="text/css">.rollover:hover .rollover-first {
  max-height:0px!important;
  display:none!important;
}
.rollover:hover .rollover-second {
  max-height:none!important;
  display:block!important;
}
.rollover span {
  font-size:0px;
}
u + .body img ~ div div {
  display:none;
}
#outlook a {
  padding:0;
}
span.MsoHyperlink,
span.MsoHyperlinkFollowed {
  color:inherit;
  mso-style-priority:99;
}
a.t {
  mso-style-priority:100!important;
  text-decoration:none!important;
}
a[x-apple-data-detectors],
#MessageViewBody a {
  color:inherit!important;
  text-decoration:none!important;
  font-size:inherit!important;
  font-family:inherit!important;
  font-weight:inherit!important;
  line-height:inherit!important;
}
.h {
  display:none;
  float:left;
  overflow:hidden;
  width:0;
  max-height:0;
  line-height:0;
  mso-hide:all;
}
.x:hover a.t,
.x:hover button.t,
.x:hover label.t {
  color:#ffffff!important;
}
@media only screen and (max-width:600px) {.bj { padding-right:0px!important } .bi { padding-left:0px!important }  *[class="gmail-fix"] { display:none!important } p, a { line-height:150%!important } h1, h1 a { line-height:120%!important } h2, h2 a { line-height:120%!important } h3, h3 a { line-height:120%!important } h4, h4 a { line-height:120%!important } h5, h5 a { line-height:120%!important } h6, h6 a { line-height:120%!important }  .bf p { } .be p { } .bd p { } h1 { font-size:36px!important; text-align:left } h2 { font-size:26px!important; text-align:left } h3 { font-size:20px!important; text-align:left } h4 { font-size:24px!important; text-align:left } h5 { font-size:20px!important; text-align:left } h6 { font-size:16px!important; text-align:left }      .bg h6 a, .bf h6 a, .be h6 a { font-size:16px!important }   .bf p, .bf a { font-size:16px!important } .be p, .be a { font-size:14px!important } .bd p, .bd a { font-size:12px!important }      .z .rollover:hover .rollover-second, .ba .rollover:hover .rollover-second, .bb .rollover:hover .rollover-second { display:inline!important }  .y { display:inline-table }      .m table, .n table, .o table, .m, .o, .n { width:100%!important; max-width:600px!important } .adapt-img { width:100%!important; height:auto!important }           .h-auto { height:auto!important }   .a .b, .a .b * { font-size:18px!important; line-height:150%!important } }
@media screen and (max-width:384px) {.mail-message-content { width:414px!important } }</style>
 </head>
 <body class="body" style="width:100%;height:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
  <div dir="ltr" class="es-wrapper-color" lang="es" style="background-color:#FAFAFA"><!--[if gte mso 9]>
			<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
				<v:fill type="tile" color="#fafafa"></v:fill>
			</v:background>
		<![endif]-->
   <table width="100%" cellspacing="0" cellpadding="0" class="es-wrapper" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#FAFAFA">
     <tr>
      <td valign="top" style="padding:0;Margin:0">
       <table cellpadding="0" cellspacing="0" align="center" class="m" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table align="center" cellpadding="0" cellspacing="0" bgcolor="#00000000" class="bf" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:transparent;width:600px" role="none">
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" class="bd" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">View online version</a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="n" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="bg" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#ffffff;width:600px" role="none">
             <tr>
              <td align="left" style="padding:0;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td valign="top" align="center" class="bj" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;font-size:0"><img src="https://fpdtjni.stripocdn.email/content/guids/CABINET_5d9543e827a065c12d9b79a3da06bbaa662dffae34e3fbee6681ded4674e15b8/images/geomatica.png" alt="" width="380" class="adapt-img" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;margin:0"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="m" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr class="es-visible-simple-html-only">
          <td align="center" class="es-stripe-html" style="padding:0;Margin:0">
           <table bgcolor="#ffffff" align="center" cellpadding="0" cellspacing="0" class="bf" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:#FFFFFF;width:600px">
             <tr>
              <td align="left" bgcolor="#DDFFE7" style="padding:0;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-radius:5px;border-collapse:separate" role="presentation">
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:25px;padding-bottom:10px;font-size:0;background-color:white"><img src="https://fpdtjni.stripocdn.email/content/guids/CABINET_5d9543e827a065c12d9b79a3da06bbaa662dffae34e3fbee6681ded4674e15b8/images/imagecc.png" alt="" height="367" style="display:block;font-size:14px;border:0;outline:none;text-decoration:none;margin:0"></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
             <tr>
              <td align="left" bgcolor="#ffffff" style="padding:0;Margin:0;padding-right:20px;padding-bottom:30px;padding-left:20px;background-color:#ffffff">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;border-radius:5px;border-collapse:separate" role="presentation">
                     <tr>
                      <td align="center" style="padding:20px;Margin:0;font-size:0">
                       <table border="0" width="100%" height="100%" cellpadding="0" cellspacing="0" class="y" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                         <tr>
                          <td style="padding:0;Margin:0;height:0px;width:100%;margin:0px;border-bottom:1px solid #cccccc;background:none"></td>
                         </tr>
                       </table></td>
                     </tr>
                     <tr>
                      <td align="center" class="bj bi d" style="Margin:0;padding-top:5px;padding-right:40px;padding-bottom:5px;padding-left:40px"><h4 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:24px;font-style:normal;font-weight:normal;line-height:28.8px;color:#333333"><strong style="font-weight:700 !important"> Tu registro en la&nbsp;Plataforma de Geoservicios de Zapopan fue exitoso</strong></h4><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><br></p></td>
                     </tr>
                     <tr>
                      <td align="center" style="padding:0;Margin:0;padding-top:30px;padding-right:25px;padding-left:25px"><h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#333333">Por favor, verifica tu que la siguiente información sea correcta:</h6><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#3d85c6;font-size:14px"><br></p><h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#3d85c6"><u><a href="http://10.20.17.188:8080/login.html" target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#3d85c6;font-size:16px">Enlace para iniciar</a> sesión</u></h6><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><br></p><h6 style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:16px;font-style:normal;font-weight:normal;line-height:19.2px;color:#333333"><strong style="font-weight:700 !important">Información registrada</strong></h6><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;letter-spacing:0;color:#333333;font-size:14px;text-align:center"><strong style="font-weight:700 !important">Nombre</strong>: ${nombre} ${apellido}
</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;letter-spacing:0;color:#333333;font-size:14px;text-align:center"><strong style="font-weight:700 !important">Correo</strong>:&nbsp; ${email}</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:28px;letter-spacing:0;color:#333333;font-size:14px;text-align:center"><br></p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Si no solicitaste este servicio, por favor, ignora este correo.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Si necesitas ayuda adicional, no dudes en contactarnos.</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px">Saludos cordiales,</p><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;letter-spacing:0;color:#333333;font-size:14px"><br></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="o" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important;background-color:transparent;background-repeat:repeat;background-position:center top">
         <tr>
          <td align="center" style="padding:0;Margin:0">
           <table align="center" cellpadding="0" cellspacing="0" class="be" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:transparent;width:640px" role="none">
             <tr>
              <td align="left" bgcolor="#e69138" style="Margin:0;padding-right:20px;padding-left:20px;padding-top:20px;padding-bottom:20px;background-color:#e69138">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="left" style="padding:0;Margin:0;width:600px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" class="a" style="padding:0;Margin:0;padding-bottom:35px"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#333333;font-size:12px"><br></p><h6 class="b" style="Margin:0;font-family:arial, 'helvetica neue', helvetica, sans-serif;mso-line-height-rule:exactly;letter-spacing:0;font-size:18px;font-style:normal;font-weight:normal;line-height:21.6px;color:#ffffff">Municipio de Zapopan, Jalisco <br>Prolongación Avenida Laureles 300, <br>Colonia Tepeyac C.P. 45150, <br>Zapopan, Jalisco. México <br>33 3818 2200</h6></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
       <table cellpadding="0" cellspacing="0" align="center" class="m" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;width:100%;table-layout:fixed !important">
         <tr>
          <td align="center" class="es-info-area" style="padding:0;Margin:0">
           <table align="center" cellpadding="0" cellspacing="0" bgcolor="#00000000" class="bf" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px;background-color:transparent;width:600px" role="none">
             <tr>
              <td align="left" style="padding:20px;Margin:0">
               <table cellpadding="0" cellspacing="0" width="100%" role="none" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                 <tr>
                  <td align="center" valign="top" style="padding:0;Margin:0;width:560px">
                   <table cellpadding="0" cellspacing="0" width="100%" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-spacing:0px">
                     <tr>
                      <td align="center" class="bd" style="padding:0;Margin:0"><p style="Margin:0;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:18px;letter-spacing:0;color:#CCCCCC;font-size:12px"><a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a>No longer want to receive these emails?&nbsp;<a href="" target="_blank" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px">Unsubscribe</a>.<a target="_blank" href="" style="mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px"></a></p></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table></td>
     </tr>
   </table>
  </div>
 </body>
</html>
    `,
    };

    await transporter.sendMail(mailOptions);
};

export const sendAsignacionCapasEmail = async ({
  email,
  nombreCompleto,
  permisosAgrupados, 
  asignadoPor,
  fechaAsignacion
}) => {

  if (!email) {
    throw new Error("Email del destinatario no definido");
  }

  // Construir HTML dinámico por workspace
  const workspacesHtml = Object.entries(permisosAgrupados)
    .map(([workspace, layers]) => {

      const layersHtml = layers.map(layer => `
        <tr>
          <td style="padding:6px 0;">
            • ${layer}
          </td>
        </tr>
      `).join("");

      return `
        <tr>
          <td style="padding-top:15px;">
            <strong style="color:#3d85c6;">Workspace:</strong>${workspace}
          </td>
        </tr>
        ${layersHtml}
      `;
    })
    .join("");

  const mailOptions = {
    from: `"Geomática | Catálogo" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Notificación de nuevos permisos - Plataforma Catálogo",
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Asignación de Permisos</title>
</head>

<body style="margin:0;padding:0;background-color:#FAFAFA;font-family:Arial, Helvetica, sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAFAFA;padding:20px 0;">
<tr>
<td align="center">

<!-- CONTENEDOR PRINCIPAL -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">

<!-- LOGO -->
<tr>
<td align="center" style="padding:30px 20px 10px 20px;">
<img src="https://fpdtjni.stripocdn.email/content/guids/CABINET_5d9543e827a065c12d9b79a3da06bbaa662dffae34e3fbee6681ded4674e15b8/images/geomatica.png"
     width="320" style="display:block;">
</td>
</tr>

<!-- TITULO -->
<tr>
<td align="center" style="padding:20px 40px 10px 40px;">
<h2 style="margin:0;color:#E69138;">
Se te han asignado nuevos permisos
</h2>
</td>
</tr>

<!-- CONTENIDO -->
<tr>
<td style="padding:30px 40px;color:#333333;font-size:14px;line-height:22px;">

<p>Hola <strong>${nombreCompleto}</strong>,</p>

<p>
Se han asignado nuevos permisos dentro de la <strong>Plataforma Catálogo</strong>.</n>
A continuación se detallan los accesos otorgados:
</p>

<br>

<table width="100%" cellpadding="0" cellspacing="0">
  ${workspacesHtml}
</table>

<br><br>

<p><strong>Asignado por:</strong> ${asignadoPor}</p>
<p><strong>Fecha de asignación:</strong> ${fechaAsignacion}</p>

<br>

<p>
Ya puedes iniciar sesión y consultar tus endpoints disponibles desde la aplicación web.
</p>

<!-- BOTON -->
<div style="text-align:center;margin:30px 0;">
<a href="https://camioncito.zapopan.gob.mx/landing/login.html"
   style="background:#E69138;
          color:#ffffff;
          padding:12px 25px;
          text-decoration:none;
          border-radius:6px;
          font-weight:bold;
          display:inline-block;">
Iniciar Sesión
</a>
</div>

<p style="font-size:13px;color:#666666;">
Si no reconoces esta asignación o tienes dudas sobre los permisos otorgados,
comunícate con el administrador del sistema.
</p>

<p style="margin-top:20px;">
Saludos cordiales,<br>
<strong>Unidad de Geomática</strong>
</p>

</td>
</tr>

<!-- FOOTER NARANJA -->
<tr>
<td align="center" style="background:#E69138;color:#ffffff;padding:25px 20px;font-size:13px;line-height:20px;">
Municipio de Zapopan, Jalisco<br>
Prolongación Avenida Laureles 300<br>
Colonia Tepeyac C.P. 45150<br>
Zapopan, Jalisco, México<br>
33 3818 2200
</td>
</tr>

</table>
<!-- FIN CONTENEDOR -->

</td>
</tr>
</table>

</body>
</html>
    `
  };

  await transporter.sendMail(mailOptions);
};