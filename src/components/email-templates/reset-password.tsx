import {
	Body,
	Button,
	Container,
	Head,
	Heading,
	Html,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

type Props = {
	userEmail: string;
	resetLink: string;
};

const PasswordResetEmail = ({ userEmail, resetLink }: Props) => {
	return (
		<Html lang="en" dir="ltr">
			<Tailwind>
				<Head />
				<Preview>Reset your password - Action required</Preview>
				<Body className="font-sans py-10">
					<Container className="rounded-lg shadow-lg max-w-2xl mx-auto p-10">
						{/* Header */}
						<Section className="text-center mb-8">
							<Heading className="text-3xl font-bold m-0 mb-2">
								Reset Your Password
							</Heading>
							<Text className="text-base m-0">
								We received a request to reset your password
							</Text>
						</Section>

						{/* Main Content */}
						<Section className="mb-8">
							<Text className="text-base mb-5 m-0">Hello,</Text>
							<Text className="text-base mb-5 m-0">
								We received a request to reset the password for your account{" "}
								<strong>{userEmail}</strong>.
							</Text>
							<Text className="text-base mb-7 m-0">
								Click the button below to create a new password:
							</Text>

							{/* Reset Button */}
							<div className="text-center my-7">
								<Button
									href={resetLink}
									className="px-10 py-4 rounded-lg text-base font-semibold no-underline box-border"
								>
									Reset My Password
								</Button>
							</div>

							<Text className="text-base mb-4 m-0">
								If the button doesn't work, copy and paste this link into your
								browser:
							</Text>
							<Text className="text-sm mb-8 m-0 break-all p-3 rounded">
								<Link href={resetLink} className="no-underline">
									{resetLink}
								</Link>
							</Text>
						</Section>

						{/* Expiration Warning */}
						<Section className=" border-l-4 p-5 mb-8 rounded-r">
							<Text className="text-sm m-0 font-semibold mb-2">
								⏰ Important: Link expires in 1 hour
							</Text>
							<Text className="text-sm m-0">
								This password reset link will expire 1 hour from the time this
								email was sent. Please reset your password promptly to avoid
								having to request a new link.
							</Text>
						</Section>

						{/* Security Notice */}
						<Section className="border-l-4 p-5 mb-8 rounded-r">
							<Text className="text-sm m-0 font-semibold mb-2">
								🔒 Security Information
							</Text>
							<Text className="text-sm mb-2 m-0">
								• If you didn't request this password reset, please ignore this
								email
							</Text>
							<Text className="text-sm mb-2 m-0">
								• Your current password will remain active until you create a
								new one
							</Text>
							<Text className="text-sm m-0">
								• This reset link can only be used once for security purposes
							</Text>
						</Section>

						{/* Help Section */}
						<Section className="text-center mb-8">
							<Text className="text-sm m-0">
								Need help? Contact our support team at{" "}
								<Link href="mailto:support@example.com" className="underline">
									support@example.com
								</Link>
							</Text>
						</Section>

						{/* Footer */}
						<Section className="border-t pt-6 text-center">
							<Text className="text-xs m-0 mb-2">
								123 Business Street, Suite 100, City, State 12345
							</Text>
							<Text className="text-xs m-0">
								© {new Date().getFullYear()} All rights reserved. |{" "}
								<Link href="#" className="underline">
									Unsubscribe
								</Link>
							</Text>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
};

// PasswordResetEmail.PreviewProps = {
//   userEmail: "yousafbhaikhan10@gmail.com",
//   resetLink: "https://yourapp.com/reset-password?token=abc123xyz789",
// };

export default PasswordResetEmail;
