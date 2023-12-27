import React, { Component } from "react";
import AppBackground from "../../../components/AppBackground";
import { Dimensions, FlatList, ScrollView, Text, View } from "react-native";
import CustomText from "../../../components/CustomText";
import styles from "./styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../utils";
import NavService from "../../../helpers/NavService";
import { _Challenges, _Home, _dailyGoal } from "../../../utils/dummyData";
import CustomList from "../../../components/CustomList";
import { LineChart } from "react-native-chart-kit";
import ListComponent from "../../../components/ListComponent";
import ModalPopup from "../../../containers/Popup/modalPopup/modalPopup";
import CustomCard from "../../../components/CustomCard";
import { connect } from "react-redux";
import { ASSETS_URL } from "../../../config/WebService";
const { height, width } = Dimensions.get("screen");
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      allPost: [],
    };
  }
  componentDidMount() {
    this.getAllRequest();
  }
  ItemSeparatorComponent = () => {
    return <View style={{ height: 10 }} />;
  };
  handleClose = () => {
    this?.setState({ isVisible: false });
  };
  getAllRequest = () => {
    const url = "http://localhost:8000/api/getallpost";
    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    fetch(url, {
      method: "GET",
      headers: headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        // Handle the data as needed
        this?.setState({ allPost: data?.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };
  deletePost = (id) => {
    const url = "http://localhost:8000/api/delete-post";
    const token = this.props.user?.user_authentication;
    console.log("🚀 ~ file: Home.js:42 ~ Home ~ token:", token);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const body = JSON.stringify({ _id: id });

    fetch(url, {
      method: "GET",
      headers: headers,
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data);
        // Handle the data as needed
        this.getAllRequest();
        // this?.setState({ allPost: data?.data });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors
      });
  };
  render() {
    const { isVisible } = this?.state;
    const { user } = this?.props;
    console.log("ssssssssUsbddhbs", user);
    return (
      <AppBackground
        homePress={() => NavService.navigate("MyProfile")}
        menu
        title={"Home"}
        homeTitle={"Welcome,"}
        marginHorizontal={false}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ gap: 15 }}>
            <View style={styles.ViewText}>
              {/* <CustomButton title="View Details" onPress={()=> NavService?.navigate('ChallengesParticipate')} /> */}

              <CustomText text="All Posts" style={styles.text1} />
              <TouchableOpacity onPress={() => NavService.navigate("MyGoals")}>
                {/* <CustomText text="View Details" style={styles.ViewDetails} /> */}
              </TouchableOpacity>
            </View>
            <FlatList
              bounces={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: width * 0.32,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_index) => _index.toString()}
              data={this?.state?.allPost}
              ItemSeparatorComponent={this?.ItemSeparatorComponent}
              renderItem={({ item }) => {
                console.log("item", item);
                return (
                  <CustomList
                    Status
                    _item={item}
                    _title2={item?.title}
                    _title3={item?.createAt}
                    _titleUser={item?.username}
                    statusColor={colors?.secondary}
                    customContainer={{
                      borderRadius: 15,
                      backgroundColor: colors?.lightBlue,
                    }}
                    role={user?.role}
                    onPress={() =>
                      NavService?.navigate("Commentss", { id: item?._id })
                    }
                    onEdit={() => {
                      NavService.navigate("UpdatePost", { post: item });
                    }}
                    onDelete={() => this.deletePost(item?._id)}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

function mapStateToProps({ authReducer: { user } }) {
  return {
    user,
  };
}
export default connect(mapStateToProps, null)(Home);
