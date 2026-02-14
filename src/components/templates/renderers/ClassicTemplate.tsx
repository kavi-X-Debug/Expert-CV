import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";
import { CV } from "@/types/cv";

// Register Serif font for Classic look
Font.register({
    family: "Times-Roman",
    src: "https://fonts.gstatic.com/s/timesnewroman/v12/TimesNewRoman.ttf", // Placeholder, react-pdf supports standard fonts
});

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: "Times-Roman",
        fontSize: 11,
        lineHeight: 1.4,
    },
    header: {
        textAlign: "center",
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        paddingBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        textTransform: "uppercase",
        marginBottom: 5,
    },
    jobTitle: {
        fontSize: 14,
        fontStyle: "italic",
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        flexDirection: "row",
        justifyContent: "center",
        gap: 15,
        flexWrap: "wrap",
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
        marginBottom: 8,
        paddingBottom: 2,
    },
    item: {
        marginBottom: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
    date: {
        fontSize: 10,
    },
    description: {
        marginTop: 2,
        textAlign: "justify",
    },
    skills: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 5,
    }
});

export const ClassicTemplatePDF = ({ cv }: { cv: CV }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{cv.data.personalInfo.fullName}</Text>
                <Text style={styles.jobTitle}>{cv.data.personalInfo.jobTitle}</Text>
                <View style={styles.contact}>
                    <Text>{cv.data.personalInfo.email}</Text>
                    <Text>{cv.data.personalInfo.phone}</Text>
                    <Text>{cv.data.personalInfo.location}</Text>
                    {cv.data.personalInfo.linkedin && <Text>LinkedIn: {cv.data.personalInfo.linkedin}</Text>}
                </View>
            </View>

            {cv.data.personalInfo.summary && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Professional Summary</Text>
                    <Text style={styles.description}>{cv.data.personalInfo.summary}</Text>
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experience</Text>
                {cv.data.experience.map((exp) => (
                    <View key={exp.id} style={styles.item}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{exp.company}</Text>
                            <Text style={styles.date}>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</Text>
                        </View>
                        <Text style={styles.italic}>{exp.position} | {exp.location}</Text>
                        <Text style={styles.description}>{exp.description}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {cv.data.education.map((edu) => (
                    <View key={edu.id} style={styles.item}>
                        <View style={styles.row}>
                            <Text style={styles.bold}>{edu.institution}</Text>
                            <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
                        </View>
                        <Text>{edu.degree} in {edu.field}</Text>
                        {edu.gpa && <Text>GPA: {edu.gpa}</Text>}
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skills}>
                    <Text>{cv.data.skills.technical.join(" • ")}</Text>
                </View>
            </View>
        </Page>
    </Document>
);
