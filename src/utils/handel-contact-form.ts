import { CONTACT_PUBLIC_API_URL } from "../config/site-config";

type ContactFormElements = {
    form: HTMLFormElement;
    statusMessage: HTMLElement;
    submitButton: HTMLButtonElement;
};

function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setStatus(statusMessage: HTMLElement, message: string, className: string) {
    statusMessage.textContent = message;
    statusMessage.className = className;
}

function getFormPayload(form: HTMLFormElement) {
    const formData = new FormData(form);

    return {
        name: String(formData.get("name") ?? "").trim(),
        email: String(formData.get("email") ?? "").trim(),
        message: String(formData.get("message") ?? "").trim(),
    };
}

function getFirstInvalidField(form: HTMLFormElement) {
    return form.querySelector<HTMLInputElement | HTMLTextAreaElement>("input:invalid, textarea:invalid") ?? null;
}

export function initContactForm({ form, statusMessage, submitButton }: ContactFormElements) {
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const payload = getFormPayload(form);
        const isFormValid = payload.name.length > 0 && payload.email.length > 0 && payload.message.length > 0 && isValidEmail(payload.email);

        if (!isFormValid) {
            setStatus(statusMessage, "Please fill the form correctly.", "min-h-6 text-sm text-rose-400");
            getFirstInvalidField(form)?.focus();
            return;
        }

        submitButton.disabled = true;
        setStatus(statusMessage, "Sending message...", "min-h-6 text-sm text-cyan-300");

        try {
            const response = await fetch(CONTACT_PUBLIC_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200) {
                form.reset();
                setStatus(statusMessage, "Message sent successfully.", "min-h-6 text-sm text-emerald-400");
                return;
            }

            if (response.status === 500) {
                setStatus(statusMessage, "Something went wrong while sending your message. Please try again.", "min-h-6 text-sm text-rose-400");
                return;
            }

            setStatus(statusMessage, "Unable to send your message right now. Please try again.", "min-h-6 text-sm text-rose-400");
        } catch {
            setStatus(statusMessage, "Unable to reach the server. Please try again.", "min-h-6 text-sm text-rose-400");
        } finally {
            submitButton.disabled = false;
        }
    });
}