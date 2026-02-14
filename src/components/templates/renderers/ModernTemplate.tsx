import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CV } from "@/types/cv";

// Register fonts
Font.register({
    family: "Inter",
    fonts: [
        { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf" },
        { src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.ttf", fontWeight: "bold" },
    ],
});

const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        padding: 30,
        fontFamily: "Inter",
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#111",
        paddingBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 5,
        textTransform: "uppercase",
    },
    jobTitle: {
        fontSize: 14,
        color: "#666",
        marginBottom: 5,
    },
    contactInfo: {
        fontSize: 10,
        color: "#444",
        flexDirection: "row",
        gap: 10,
        flexWrap: "wrap",
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 8,
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
        paddingBottom: 2,
        color: "#333",
    },
    experienceItem: {
        marginBottom: 10,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    company: {
        fontSize: 11,
        fontWeight: "bold",
    },
    position: {
        fontSize: 11,
        fontStyle: "italic",
        color: "#333",
    },
    date: {
        fontSize: 10,
        color: "#666",
    },
    description: {
        fontSize: 10,
        color: "#444",
        lineHeight: 1.4,
        marginTop: 2,
    },
    educationItem: {
        marginBottom: 8,
    },
    skillTags: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    },
    skillTag: {
        fontSize: 9,
        backgroundColor: "#F3F4F6",
        padding: "3 6",
        borderRadius: 4,
        color: "#333",
    },
});

export const ModernTemplatePDF = ({ cv }: { cv: CV }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.name}>{cv.data.personalInfo.fullName}</Text>
                <Text style={styles.jobTitle}>{cv.data.personalInfo.jobTitle}</Text>
                <View style={styles.contactInfo}>
                    {cv.data.personalInfo.email && <Text>{cv.data.personalInfo.email}</Text>}
                    {cv.data.personalInfo.phone && <Text>{cv.data.personalInfo.phone}</Text>}
                    {cv.data.personalInfo.location && <Text>{cv.data.personalInfo.location}</Text>}
                    {cv.data.personalInfo.linkedin && <Text>LinkedIn: {cv.data.personalInfo.linkedin}</Text>}
                    {cv.data.personalInfo.website && <Text>{cv.data.personalInfo.website}</Text>}
                </View>
            </View>

            {/* Summary */}
            {cv.data.personalInfo.summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Summary</Text>
                    <Text style={styles.description}>{cv.data.personalInfo.summary}</Text>
                </View>
            )}

            {/* Experience */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {cv.data.experience.map((exp) => (
                    <View key={exp.id} style={styles.experienceItem}>
                        <View style={styles.row}>
                            <Text style={styles.company}>{exp.company}</Text>
                            <Text style={styles.date}>
                                {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                            </Text>
                        </View>
                        <Text style={styles.position}>{exp.position}</Text>
                        <Text style={styles.description}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            {/* Education */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {cv.data.education.map((edu) => (
                    <View key={edu.id} style={styles.educationItem}>
                        <View style={styles.row}>
                            <Text style={styles.company}>{edu.institution}</Text>
                            <Text style={styles.date}>
                                {edu.startDate} - {edu.endDate}
                            </Text>
                        </View>
                        <Text style={styles.position}>{edu.degree} in {edu.field}</Text>
                    </View>
                ))}
            </View>

            {/* Skills */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillTags}>
                    {cv.data.skills.technical.map((skill) => (
                        <Text key={skill} style={styles.skillTag}>
                            {skill}
                        </Text>
                    ))}
                </View>
            </View>
        </Page>
    </Document>
);
