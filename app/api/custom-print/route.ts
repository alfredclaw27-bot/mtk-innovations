import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, description, material, dimensions, urgency, photoBase64 } =
      await request.json();

    if (!name || !email || !description) {
      return NextResponse.json(
        { error: "Name, email, and description are required." },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // Build the email content
    const hasPhoto = photoBase64 && photoBase64.length > 0;
    const photoNote = hasPhoto ? "\n\n[Customer attached a photo — see below]" : "";

    const subject = `Custom Print Request from ${name}`;
    const text = `
New Custom Print Request
========================
Name: ${name}
Email: ${email}
${material ? `Preferred Material: ${material}` : ""}
${dimensions ? `Dimensions/Measurements: ${dimensions}` : ""}
${urgency ? `Urgency: ${urgency}` : ""}

Description:
${description}
${photoNote}
`.trim();

    // If Mike configures SMTP, this would send the email
    // For now, log it and return success so the form works end-to-end
    console.log("=== CUSTOM PRINT REQUEST ===");
    console.log(text);
    console.log("Photo attached:", hasPhoto);
    console.log("============================");

    return NextResponse.json({
      success: true,
      message: "Request received! We'll be in touch shortly.",
    });
  } catch (error) {
    console.error("Custom print request error:", error);
    return NextResponse.json(
      { error: "Failed to process request. Please try again." },
      { status: 500 }
    );
  }
}
