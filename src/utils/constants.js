export const resMessage = {
    INTERNAL_SERVER_ERROR: "Oops! Something went wrong on our end. We're working on it—please refresh or try again later.",
    NO_TOKEN_PROVIDED: "Authentication token is missing. Please log in.",
    UNAUTHORISED: "You are not authorized to perform this action.",
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    TOKEN_INVALID: "Invalid authentication token. Please log in again.",
    USER_FOUND: "An account with this email already exists!",
    USER_REGISTER: "Successfully signed up. Login to access your account!",
    USER_NOT_FOUND: "You don't have an account yet. Please sign up first!",
    INCORRECT_PASSWORD: "Invalid password. Please re-enter your password!",
    LOGIN_SUCCESS: "Hello Admin You're logged in successfully!",
    ADD_BANNER: "Banner has been published successfully!",
    BANNER_LIST: "Banner list fetched successfully!",
    DELETE_BANNER: "Banner deleted successfully! It has been removed from your list.",
    ADD_ENTERPRISE_LOGO: "Enterprise logo has been added to your trusted brands section.",
    LOGO_LIST: "Enterprise logos list fetched successfully!",
    DELETE_LOGO: "Enterprise logo deleted successfully! It has been removed from your list.",
    ADD_SUCCESS_STORY: "Our success story image has been uploaded successfully!",
    SUCCESS_STORY_LIST: "Our success story list fetched successfully!",
    DELETE_SUCCESS_STORY: "Our success story image deleted successfully! It has been removed from your list.",
    ADD_BLOG: "Blog has been published successfully!",
    BLOG_LIST: "Blog list fetched successfully!",
    BLOG_SINGLE: "Case study fetched successfully!",
    DELETE_BLOG: "Blog deleted successfully! It has been removed from your list.",
    UPDATE_BLOG: "Blog has been updated successfully!",
    ADD_TECH_STACK: "Tech stack has been added successfully!",
    TECH_STACK_LIST: "Tech stack list fetched successfully!",
    DELETE_TECH_STACK: "Tech stack deleted successfully! It has been removed from your list.",
    UPDATE_TECH_STACK: "Tech stack updated successfully.",
    TECH_STACK_NAME_EXISTS: "This tech stack name is already in use. Try using a unique name.",
    TECH_STACK_EXISTS_BLOG: "Cannot delete. Tech stack is linked to blogs. Please modify or remove the blogs first.",
    ADD_CASE_STUDY: "Case study has been published successfully!",
    CASE_STUDY_LIST: "Case study list fetched successfully!",
    UPDATE_CASE_STUDY: "Case study has been updated successfully!",
    CASE_STUDY_SINGLE: "Case study fetched successfully!",
    DELETE_CASE_STUDY: "Case study deleted successfully! It has been removed from your list.",
    ADD_CAREER: "Career has been published successfully!",
    CAREER_LIST: "careers list fetched successfully!",
    CAREER_SINGLE: "careers fetched successfully!",
    UPDATE_CAREER: "Career updated successfully.",
    ARCHIVE_CAREER: "Career archived successfully. It is no longer visible to the public.",
    ADD_PORTFOLIO: "Portfolio has been published successfully!",
    PORTFOLIO_LIST: "Portfolio list fetched successfully!",
    PORTFOLIO_SINGLE: "Portfolio fetched successfully!",
    UPDATE_PORTFOLIO: "Portfolio has been updated successfully!",
    DELETE_PORTFOLIO: "Portfolio deleted successfully! It has been removed from your list.",
    ADD_TESTIMONIALS: "testimonials has been published successfully!",
    TESTIMONIALS_LIST: "testimonials list fetched successfully!",
    UPDATE_TESTIMONIALS: "testimonials has been updated successfully!",
    DELETE_TESTIMONIALS: "testimonials deleted successfully! It has been removed from your list.",
    ADD_MEDIA_FILE: "mediaFile has been published successfully!",
    MEDIA_FILE_LIST: "mediaFile list fetched successfully!",
    DELETE_MEDIA_FILE: "mediaFile deleted successfully! It has been removed from your list.",
    ADD_JOB: "Thanks for applying! We'll review your application and connect with you shortly.!",
    JOB_SINGLE: "Job Application fetched successfully!",
    JOB_LIST: "Job Application list fetched successfully!",
    ADD_INQUIRY: "Thank you for your inquiry! Our team will review it and respond shortly.",
    INQUIRY_LIST: "Inquiry list fetched successfully!",
    INQUIRY_SINGLE: "Inquiry fetched successfully!",
    MARK_INQUIRY: "The inquiry has been successfully marked as reviewed.",
    MARK_JOB: "The Job Application has been successfully marked as reviewed.",
    ADD_GALLERY: "Gallery has been published successfully!",
    GALLERY_LIST: "Gallery list fetched successfully!",
    DELETE_GALLERY: "Gallery deleted successfully! It has been removed from your list.",
    ADD_TEAM: "Team Member has been published successfully!",
    UPDATE_TEAM: "Team Member stack updated successfully.",
    TEAM_LIST: "Team Member fetched successfully!",
    TEAM_SINGLE: "Team Member fetched successfully!",
    DELETE_TEAM: "Team Member deleted successfully! It has been removed from your list.",
    ADD_GET_IN_TOUCH: "Thank you for reaching out! We've received your message and will get back to you shortly.",
    MARK_GET_IN_TOUCH: "The get in touch has been successfully marked as reviewed.",
    SUBSCRIBE_SUCCESS: "Thank you for joining our community! Get ready for the latest blogs, success stories, and more.",
    SUBSCRIBE_LIST: "subscribing list fetched successfully!",
    ADD_HIRE_OUR_DEVELOPER: "Hire Our Developer has been published successfully!",
    HIRE_OUR_DEVELOPER_SINGLE: "Hire Our Developer fetched successfully!",
    HIRE_OUR_DEVELOPER_LIST: "Hire Our Developer list fetched successfully!",
    UPDATE_HIRE_OUR_DEVELOPER: "Hire Our Developer has been updated successfully!",
    DELETE_HIRE_OUR_DEVELOPER: "Hire Our Developer deleted successfully! It has been removed from your list.",
};

export const resStatusCode = {
    ACTION_COMPLETE: 200,               // OK
    CREATED: 201,                       // Resource created successfully
    ACCEPTED: 202,                      // Request accepted but processing not complete
    NO_CONTENT: 204,                    // No content to send back
    CLIENT_ERROR: 400,                  // Bad request
    UNAUTHORISED: 401,                  // Unauthorized
    FORBIDDEN: 403,                     // Forbidden
    NOT_FOUND: 404,                     // Resource not found
    CONFLICT: 409,                      // Conflict 
    UNSUPPORTED_MEDIA_TYPE: 415,        // Unsupported content type
    TOO_MANY_REQUESTS: 429,             // Rate limit exceeded
    INTERNAL_SERVER_ERROR: 500,         // Generic server error
    NOT_IMPLEMENTED: 501,               // Not implemented on server
    SERVICE_UNAVAILABLE: 503,           // Server temporarily unavailable
    GATEWAY_TIMEOUT: 504,               // Gateway timeout (useful for proxy setups)
};

export const dbTableName = {
    AUTH: "auths",
    HOME_BANNER: "home_banners",
    HOME_ENTERPRISE_LOGO: "home_enterprise_logos",
    SUCCESS_STORY: "success_stories",
    BLOG: 'blogs',
    TECH_STACK_MASTER: "tech_stack_masters",
    CASE_STUDY: "case_studys",
    CAREER: "careers",
    PORTFOLIO: "portfolios",
    TESTIMONIALS: "testimonials",
    ABOUT_US: "about_us",
    INQUIRY: "business_inquirys",
    JOB_APPLICATION: "job_applications",
    GALLERY: 'gallerys',
    TEAM: 'teams',
    COMPANY: 'company_details',
    GET_IN_TOUCH: 'get_in_touchs',
    SUBSCRIBE: "subscribers",
    HIRE_DEVELOPER: "hire_developers",
};