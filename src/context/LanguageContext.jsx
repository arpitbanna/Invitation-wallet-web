import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        // Navbar
        "home": "Home",
        "calendar": "Calendar",

        // Home
        "upcoming_events": "Upcoming Events",
        "past_events": "Past Events",
        "no_upcoming": "No upcoming events. Tap + to add one!",
        "search_placeholder": "Search invitations...",

        // Settings
        "settings": "Settings",
        "appearance": "Appearance",
        "general": "General",
        "language": "Language",
        "notifications": "Notifications",
        "haptic_feedback": "Haptic Feedback",
        "about": "About",
        "version": "Version",
        "privacy_policy": "Privacy Policy",

        // Add Event
        "new_invitation": "New Invitation",
        "edit_invitation": "Edit Invitation",
        "event_title": "Event Title",
        "title_placeholder": "e.g. John's Birthday",
        "date": "Date",
        "time": "Time",
        "location": "Location (Optional)",
        "loc_placeholder": "e.g. Central Park",
        "remark": "Remark (Optional)",
        "remark_placeholder": "e.g. Bring a gift, Dress code: Casual",
        "save_btn": "Save Invitation",
        "update_btn": "Update Invitation",
        "saving": "Saving...",
        // Developer Credit
        "developer_credit": "Developed by Arpit Banna",
        // Share & Alerts
        "share_title": "Check out this invitation",
        "share_success": "Link copied to clipboard!",
        "share_fail": "Failed to copy link.",
        "storage_limit": "Storage Limitation",
        "storage_limit_msg": "Image too large to save locally. Try a smaller one.",
        // Calendar
        "months_list": "January,February,March,April,May,June,July,August,September,October,November,December",
        "weekdays_short": "Sun,Mon,Tue,Wed,Thu,Fri,Sat"
    },
    hi: {
        // Navbar
        "home": "होम",
        "calendar": "कैलेंडर",

        // Home
        "upcoming_events": "आगामी कार्यक्रम",
        "past_events": "पिछले कार्यक्रम",
        "no_upcoming": "कोई आगामी कार्यक्रम नहीं है। जोड़ने के लिए + दबाएं!",
        "search_placeholder": "निमंत्रण खोजें...",

        // Settings
        "settings": "सेटिंग्स",
        "appearance": "दिखावट (Appearance)",
        "general": "सामान्य",
        "language": "भाषा",
        "notifications": "सूचनाएं",
        "haptic_feedback": "हैप्टिक फीडबैक",
        "about": "के बारे में",
        "version": "संस्करण",
        "privacy_policy": "गोपनीयता नीति",

        // Add Event
        "new_invitation": "नया निमंत्रण",
        "edit_invitation": "निमंत्रण संपादित करें",
        "event_title": "कार्यक्रम का नाम",
        "title_placeholder": "जैसे - राहुल का जन्मदिन",
        "date": "तारीख",
        "time": "समय",
        "location": "स्थान (वैकल्पिक)",
        "loc_placeholder": "जैसे - सेंट्रल पार्क",
        "remark": "टिप्पणी (वैकल्पिक)",
        "remark_placeholder": "जैसे - उपहार लाएं, ड्रेस कोड: कैजुअल",
        "save_btn": "निमंत्रण सहेजें",
        "update_btn": "निमंत्रण अपडेट करें",
        "saving": "सहेजा जा रहा है...",
        // Developer Credit
        "developer_credit": "अर्पित बन्ना द्वारा विकसित",
        // Share & Alerts
        "share_title": "यह निमंत्रण देखें",
        "share_success": "लिंक कॉपी किया गया!",
        "share_fail": "लिंक कॉपी करने में विफल।",
        "storage_limit": "स्टोरेज सीमा",
        "storage_limit_msg": "छवि बहुत बड़ी है। कृपया छोटी छवि का उपयोग करें।",
        // Calendar
        "months_list": "जनवरी,फरवरी,मार्च,अप्रैल,मई,जून,जुलाई,अगस्त,सितंबर,अक्टूबर,नवंबर,दिसंबर",
        "weekdays_short": "रवि,सोम,मंगल,बुध,गुरु,शुक्र,शनि"
    }
};

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('app-language') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('app-language', language);
    }, [language]);

    const t = (key) => {
        // Safe access to translations
        return translations[language]?.[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
