from io import BytesIO
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


def generate_certificate_pdf(user_name: str, exam_title: str, score: int) -> bytes:
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    width, height = A4
    c.setFont("Helvetica-Bold", 24)
    c.drawCentredString(width/2, height-120, "Certificate of Completion")
    c.setFont("Helvetica", 14)
    c.drawCentredString(width/2, height-170, f"This certifies that {user_name}")
    c.drawCentredString(width/2, height-195, f"has successfully completed the {exam_title} mock exam")
    c.drawCentredString(width/2, height-220, f"with a score of {score}.")
    c.showPage(); c.save()
    pdf = buffer.getvalue(); buffer.close()
    return pdf

