export const resMessage = {
    INTERNAL_SERVER_ERROR: "Oops! Something went wrong. Our team is looking into it. Please refresh the page and try again!",
    USER_FOUND: "An account with this email already exists!",
    USER_REGISTER: "Successfully signed up. Login to access your account!",
    USER_NOT_FOUND: "You don't have an account yet. Please sign up first!",
    INCORRECT_PASSWORD: "Invalid password. Please re-enter your password!",
    LOGIN_SUCCESS: "Hello Admin 👋 You're logged in successfully!",
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
    DELETE_BLOG: "Blog deleted successfully! It has been removed from your list.",
    ADD_TECH_STACK: "Tech stack has been added successfully!",
    TECH_STACK_LIST: "Tech stack list fetched successfully!",
    DELETE_TECH_STACK: "Tech stack deleted successfully! It has been removed from your list.",
    UPDATE_TECH_STACK: "Tech stack updated successfully.",
    TECH_STACK_NAME_EXISTS: "This tech stack name is already in use. Try using a unique name.",
    TECH_STACK_EXISTS_BLOG: "Cannot delete. Tech stack is linked to blogs. Please modify or remove the blogs first."
};

export const resStatusCode = {
    ACTION_COMPLETE: 200,
    CLIENT_ERROR: 400,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    UNAUTHORISED: 401,
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNSUPPORTED_MEDIA_TYPE: 415
};

export const dbTableName = {
    AUTH: "auths",
    HOME_BANNER: "home_banners",
    HOME_ENTERPRISE_LOGO: "home_enterprise_logos",
    SUCCESS_STORY: "success_stories",
    BLOG: 'blogs',
    TECH_STACK_MASTER: "tech_stack_masters",
}


