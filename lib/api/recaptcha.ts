'use server'

export async function verifyCaptcha(token: string | null) {
  const secretKey = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: "application/json",
      },
    }
  );

  const result = await response.json();

  if (result.success) {
    return "success!";
  } else {
    throw new Error("Failed Captcha");
  }
}
